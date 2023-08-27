const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "MyChat";

async function getAllGroups() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var groups = await db.collection("Groups").find().toArray();

    return groups;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function getGroupById(id) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var groups = await db.collection("Groups").findOne({ _id: id }).toArray();

    return groups;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function createGroup(group) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var result = await db.collection("Groups").insertOne(group);

    console.log("Inserted document with ID:", result.insertedId);
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function updateGroup(group) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var groups = await db.collection("Groups").findOne({ _id: id }).toArray();

    return groups;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function deleteGroup(id) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var groups = await db.collection("Groups").findOne({ _id: id }).toArray();

    return groups;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

module.exports.getAllGroups = getAllGroups;
module.exports.createGroup = createGroup;
module.exports.getGroupById = getGroupById;
module.exports.updateGroup = updateGroup;
module.exports.deleteGroup = deleteGroup;
