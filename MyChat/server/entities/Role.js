const crypto = require("node:crypto");

function Role(name) {
  this._id = crypto.randomUUID().toString();
  this.name = name;
}

module.exports.Role = Role;
