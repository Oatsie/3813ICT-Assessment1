const crypto = require("node:crypto");

function Channel(name, groupId) {
  this._id = crypto.randomUUID().toString();
  this.name = name;
  this.groupId = groupId;
}

module.exports.Channel = Channel;
