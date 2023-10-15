const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "MyChat";

// Gets all users from the database
async function getAllUsers() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Fectching all users");

    const db = client.db(dbName);
    var users = await db.collection("Users").find().toArray();

    return users;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Gets all users from the database that contain the provided Group Id
async function getUsersByGroupId(groupId) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Fetching users of group: " + groupId);

    const db = client.db(dbName);
    var users = await db
      .collection("Users")
      .find({ groups: { $elemMatch: { $eq: groupId } } })
      .toArray();

    console.log(users.length + " users found!");

    return users;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Selects the user from the database with the provided Id
async function findUserById(id) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Fetching user: " + id);

    const db = client.db(dbName);
    var users = await db.collection("Users").findOne({ _id: id }).toArray();

    return users;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Selects a user from the database with the provided username
async function findUserByUsername(username) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Fetching user: " + username);

    const db = client.db(dbName);
    var user = await db.collection("Users").findOne({ username: username });
    console.log(user);
    return user;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Creates a new user in the database
async function createUser(user) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Attempting to create user...");

    const db = client.db(dbName);

    var result = await db.collection("Users").insertOne(user);

    console.log("User created with ID:", result.insertedId);

    return user;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Updates the user document in the database for the provided user
async function updateUser(user) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Attempting to update user: " + user._id);
    console.log(user);
    const db = client.db(dbName);

    var result = await db
      .collection("Users")
      .findOneAndUpdate(
        { _id: user._id },
        { $set: { roles: user.roles, groups: user.groups } }
      );

    console.log(result.value);

    //console.log("User updated");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Deletes a user from the database
async function deleteUser(id) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Attempting to delete user: " + id);

    const db = client.db(dbName);
    await db.collection("Users").deleteOne({ _id: id });

    console.log("User deleted");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

module.exports.getAllUsers = getAllUsers;
module.exports.createUser = createUser;
module.exports.getUserById = findUserById;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUsersByGroupId = getUsersByGroupId;
module.exports.findUserByUsername = findUserByUsername;
