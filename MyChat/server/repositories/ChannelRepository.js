const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "MyChat";

// Gets all channels from the database that have the provided groupId
async function getChannelsByGroupId(groupId) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Fetching channels of group: " + groupId);

    const db = client.db(dbName);
    var channels = await db
      .collection("Channels")
      .find({ groupId: groupId })
      .toArray();

    console.log(channels.length + " channels found!");

    return channels;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Creates a new channel in the database
async function createChannel(channel) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var result = await db.collection("Channels").insertOne(channel);

    console.log("Inserted document with ID:", result.insertedId);
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Deletes a channel from the database
async function deleteChannel(id) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Deleting channel: " + id);

    const db = client.db(dbName);
    await db.collection("Channels").deleteOne({ _id: id });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

module.exports.createChannel = createChannel;
module.exports.deleteChannel = deleteChannel;
module.exports.getChannelsByGroupId = getChannelsByGroupId;
