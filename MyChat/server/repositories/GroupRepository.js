const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "MyChat";

// Returns all groups from the database
async function getAllGroups() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Attempting to get all groups...");

    const db = client.db(dbName);
    var groups = await db.collection("Groups").find().toArray();

    console.log(groups.length + " groups found!");
    return groups;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Creates a new group in the database
async function createGroup(group) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Creating new group...");

    const db = client.db(dbName);
    var result = await db.collection("Groups").insertOne(group);

    console.log("Inserted group document with ID:", result.insertedId);
    return result.insertedId;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Deletes a group from the database
async function deleteGroup(id) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Deleting group: " + id);

    const db = client.db(dbName);
    await db.collection("Groups").deleteOne({ _id: id });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

module.exports.getAllGroups = getAllGroups;
module.exports.createGroup = createGroup;
module.exports.deleteGroup = deleteGroup;
