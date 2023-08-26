const crypto = require('node:crypto')
const express = require('express');
const app = express();
const channelModel = require('./entities/Channel')

const path = require('path');
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const channelRepo = require('./repositories/ChannelRepository')

app.use (bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist/my-chat/')))

let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Sever running!")
    console.log("Server listenning on: " +host + " port: " + port);
});

// Assuming this is an async function itself (e.g., an async route handler in an Express.js app)
async function createChannelRequest(name) {
    try {
        const channel = new channelModel.Channel(crypto.randomUUID().toString(), name);
        var channels = await channelRepo.createChannel(channel); // Await the result here
        console.log(channels); // Use the channels data here
      } catch (error) {
        console.error("Error:", error);
      }
}

async function getChannelsRequest() {
    try {
      const channels = await channelRepo.getAllChannels(); // Await the result here
      console.log(channels); // Use the channels data here
    } catch (error) {
      console.error("Error:", error);
    }
}

  