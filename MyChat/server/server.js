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
const { getAllUsers, createUser } = require("./repositories/UserRepository");

// start server
let server = http.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Sever running!");
  console.log("Server listenning on: " + host + " port: " + port);
});

// API endpoints
async function logIn(username, password) {}

async function createChannelRequest(name) {
  try {
    const channel = new channelModel.Channel(name);
    var channels = await createChannel(channel);
    console.log(channels);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getChannelsRequest() {
  try {
    const channels = await getAllChannels();
    console.log(channels);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Creates a new user
app.post("/api/users", async function (req, res) {
  try {
    const userData = req.body;

    var user = new userModel.User(
      userData.username,
      userData.password,
      userData.email
    );

    user.addGroup(userData.groupId);

    var newUser = await createUser(userData).then(() => {
      if (newUser != null) {
        res.status(201).json(newUser);
      } else {
        res.status(400).json({ error: "User name already taken" });
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
