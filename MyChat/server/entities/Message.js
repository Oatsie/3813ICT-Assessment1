const crypto = require("node:crypto");

function Message(name, author, content, time, channel) {
  this._id = crypto.randomUUID().toString();
  this.author = author;
  this.content = content;
  this.time = time;
  this.channel = channel;
}

module.exports.Message = Message;
