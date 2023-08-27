const crypto = require("node:crypto");
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
const channelModel = require("./entities/Channel");
const {
  createChannel,
  getAllChannels,
} = require("./repositories/ChannelRepository");
const { getAllUsers } = require("./repositories/UserRepository");

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
    const channel = new channelModel.Channel(
      crypto.randomUUID().toString(),
      name
    );
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

app.get("/api/users", async function (req, res) {
  var users = await getAllUsers();
  res.send(users);
});
