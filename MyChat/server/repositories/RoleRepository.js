const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "MyChat";

async function getAllRoles() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var roles = await db.collection("Roles").find().toArray();

    return roles;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function getRoleById(id) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var roles = await db.collection("Roles").findOne({ _id: id }).toArray();

    return roles;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function createRole(role) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var result = await db.collection("Roles").insertOne(role);

    console.log("Inserted document with ID:", result.insertedId);
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function updateRole(role) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var roles = await db.collection("Roles").findOne({ _id: id }).toArray();

    return roles;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function deleteRole(id) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var roles = await db.collection("Roles").findOne({ _id: id }).toArray();

    return roles;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

module.exports.getAllRoles = getAllRoles;
module.exports.createRole = createRole;
module.exports.getRoleById = getRoleById;
module.exports.updateRole = updateRole;
module.exports.deleteRole = deleteRole;
