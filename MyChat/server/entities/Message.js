const crypto = require("node:crypto");

function Message(userId, username, content, time, channelId) {
  this._id = crypto.randomUUID().toString();
  this.userId = userId;
  this.username = username;
  this.content = content;
  this.time = time;
  this.channelId = channelId;
}

module.exports.Message = Message;
