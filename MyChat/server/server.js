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
const messageModel = require("./entities/Message");
const {
  createChannel,
  getAllChannels,
  getChannelsByGroupId,
} = require("./repositories/ChannelRepository");
const {
  createMessage,
  getMessagesByChannelId,
} = require("./repositories/MessageRepository");
const {
  getAllUsers,
  createUser,
  getUsersByGroupId,
  findUserByUsername,
} = require("./repositories/UserRepository");
const {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("./repositories/GroupRepository");

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

// Create user
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
      res.status(201).json(newUser);
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
app.get("/api/groups/:groupId/users", async function (req, res) {
  const groupId = req.params.groupId;

  var users = await getUsersByGroupId(groupId);
  res.send(users);
});

/** GROUP ENDPOINTS */
// Gets all groups
app.get("/api/groups", async function (req, res) {
  var groups = await getAllGroups();
  res.send(groups);
});

// Create group
app.post("/api/groups", async function (req, res) {
  try {
    const groupData = req.body;

    var group = new groupModel.Group(groupData.name);

    // Create new group
    var newGroup = await createGroup(group).then(() => {
      res.status(201).json(newGroup);
    });
  } catch (error) {
    res.status(500).json({ error: "Group creation failed" });
  }
});

// Delete Group
app.delete("/api/groups/:groupId", async function (req, res) {
  const groupId = req.params.groupId;

  var result = await deleteGroup(groupId).then(() => {
    res.send(result);
  });
});

/** CHANNEL ENDPOINTS */
// Create channel
app.post("/api/channels", async function (req, res) {
  try {
    const channelData = req.body;

    var channel = new channelModel.Channel(
      channelData.name,
      channelData.groupId
    );

    // Create new channel
    var newChannel = await createChannel(channel).then(() => {
      res.status(201).json(newChannel);
    });
  } catch (error) {
    res.status(500).json({ error: "Channel creation failed" });
  }
});

// Delete Channel
app.delete("/api/channels/:channelId", async function (req, res) {
  const channelId = req.params.channelId;

  var result = await deleteChannel(channelId).then(() => {
    res.send(result);
  });
});

// Gets all channels of a group
app.get("/api/groups/:groupId/channels", async function (req, res) {
  const groupId = req.params.groupId;

  var channels = await getChannelsByGroupId(groupId);
  res.send(channels);
});

/**MESSAGE ENDPOINTS */
// Create message
app.post("/api/messages", async function (req, res) {
  try {
    const messageData = req.body;

    var message = new messageModel.Message(
      messageData.userId,
      messageData.username,
      messageData.content,
      messageData.time,
      messageData.channelId
    );

    // Create new message
    var newMessage = await createMessage(message).then(() => {
      res.status(201).json(newMessage);
    });
  } catch (error) {
    res.status(500).json({ error: "Message creation failed" });
  }
});

// Gets all messages of a group
app.get("/api/channels/:channelId/messages", async function (req, res) {
  const channelId = req.params.channelId;

  var messages = await getMessagesByChannelId(channelId);
  res.send(messages);
});
