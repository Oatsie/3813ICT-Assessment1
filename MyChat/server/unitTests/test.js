const chai = require("chai");
const expect = chai.expect;
const app = require("../server");
const http = require("http");
var assert = require("assert");

const { createUser, deleteUser } = require("../repositories/UserRepository");
const { createGroup } = require("../repositories/GroupRepository");
const { User } = require("../entities/User");
const { Group } = require("../entities/Group");

describe("API Endpoints", function () {
  it("should return 200 status code for the login endpoint", async function () {
    var newUser = await createUser(new User("testUser", "password", "email"));

    var body = {
      username: "testuser",
      password: "password",
    };

    http.request(
      "http://localhost:3000/api/users/login",
      body,
      function (response) {
        assert.equal(response.statusCode, 200);

        var body = "";
        response.on("data", function (d) {
          body += d;
        });
        response.on("end", function () {
          assert.equal(body, { username: "testuser", password: "password" });
        });
      }
    );

    await deleteUser(newUser._id);
  });

  it("should return 201 status code for creating a new user", function () {
    var body = {
      username: "newuser",
      password: "newpassword",
      email: "newuser@example.com",
      groupId: "group1",
      role: "user",
    };

    http.request("http://localhost:3000/api/users", body, function (response) {
      assert.equal(response.statusCode, 201);

      var body = "";
      response.on("data", function (d) {
        body += d;
      });
      response.on("end", function () {
        assert.equal(body, {
          username: "newuser",
          password: "newpassword",
          email: "newuser@example.com",
          groupId: "group1",
          role: "user",
        });
      });
    });
  });

  it("should return 200 status code for updating a user", async function () {
    const newUser = await createUser(new User("testUser", "password", "email"));

    var body = {
      id: newUser._id,
      username: "updateduser",
      password: "updatedpassword",
      email: "updateduser@example.com",
      groups: ["group1"],
      roles: ["user"],
    };

    http.request(
      "http://localhost:3000/api/users/update",
      body,
      function (response) {
        assert.equal(response.statusCode, 201);
      }
    );

    await deleteUser(newUser._id);
  });

  it("should return 200 status code for deleting a group", async function () {
    const group = await createGroup(new Group("group", "123"));
    http.request(
      "http://localhost:3000/api/groups/" + group._id,
      function (response) {
        assert.equal(response.statusCode, 200);
      }
    );
  });
});
