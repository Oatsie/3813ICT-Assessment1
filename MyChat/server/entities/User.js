const crypto = require("node:crypto");

function User(username, password, email) {
  this._id = crypto.randomUUID().toString();
  this.username = username;
  this.email = email;
  this.password = password;

  this.groups = [];
  this.roles = [];
  this.channels = [];

  this.addChannel = function (channelName) {
    this.channels.push(channelName);
  };

  this.addRole = function (roleName) {
    this.roles.push(roleName);
  };

  this.addGroup = function (groupId) {
    this.groups.push(groupId);
  };
}

module.exports.User = User;
