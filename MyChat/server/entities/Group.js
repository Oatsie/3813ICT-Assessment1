const crypto = require("node:crypto");

function Group(name, creater) {
  this._id = crypto.randomUUID().toString();
  this.name = name;
  this.creater = creater;
}

module.exports.Group = Group;
