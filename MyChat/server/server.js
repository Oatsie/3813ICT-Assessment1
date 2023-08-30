//server set up
const express = require("express");

var cors = require("cors");

// http set up
const path = require("path");
const bodyParser = require("body-parser");

// app set up
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../dist/my-chat/")));

const http = require("http").Server(app);

// repo imports
const userModel = require("./entities/User");
const groupModel = require("./entities/Group");
const roleModel = require("./entities/Role");
const channelModel = require("./entities/Channel");
const {
  createChannel,
  getAllChannels,
} = require("./repositories/ChannelRepository");
const {
  getAllUsers,
  createUser,
  getUsersByGroupId,
  findUserByUsername,
} = require("./repositories/UserRepository");

// start server
let server = http.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Sever running!");
  console.log("Server listenning on: " + host + " port: " + port);
});

// API endpoints

/** USER ENDPOINTS */
// Login
app.post("/api/users/login", async function (req, res) {
  try {
    const userData = req.body;

    var localUser = await findUserByUsername(userData.username).then(() => {
      if (localUser != null && localUser.password == userData.password) {
        res.status(200).json(localUser);
      } else {
        res.status(400).json({ error: "Incorrect username or password" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "User creation failed" });
  }
});

// Create
app.post("/api/users", async function (req, res) {
  try {
    const userData = req.body;

    var user = new userModel.User(
      userData.username,
      userData.password,
      userData.email
    );

    user.addGroup(userData.groupId);
    var role = new roleModel.Role(userData.role, userData.groupId);
    user.addRole(role);

    // Check user name is not already taken
    var localUser = await findUserByUsername(user.username).then(() => {
      if (localUser != null) {
        res.status(400).json({ error: "Username taken" });
      }
    });

    // Create new user
    var newUser = await createUser(user).then(() => {
      if (newUser != null) {
        res.status(201).json(newUser);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "User creation failed" });
  }
});

// Gets all users
app.get("/api/users", async function (req, res) {
  var users = await getAllUsers();
  res.send(users);
});

// Gets all users of a group
app.get("/api/group/:groupId/users", async function (req, res) {
  const groupId = req.params.groupId;

  var users = await getUsersByGroupId(groupId);
  res.send(users);
});
