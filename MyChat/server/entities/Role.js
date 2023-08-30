const crypto = require("node:crypto");

function Role(name, groupId) {
  this._id = crypto.randomUUID().toString();
  this.name = name;
  this.groupId = groupId;
}

module.exports.Role = Role;
