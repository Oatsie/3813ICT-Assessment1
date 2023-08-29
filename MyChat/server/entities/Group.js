const crypto = require("node:crypto");

function Group(name, users, channels) {
  this._id = crypto.randomUUID().toString();
  this.name = name;
  this.users = users;
  this.channels = channels;
}

module.exports.Group = Group;
