const crypto = require("node:crypto");

function Group(name) {
  this._id = crypto.randomUUID().toString();
  this.name = name;
}

module.exports.Group = Group;
