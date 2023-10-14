const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "MyChat";

// Gets all messages from the database that have the provided channel Id
async function getMessagesByChannelId(channelId) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Fetching messages of channel: " + channelId);

    const db = client.db(dbName);
    var messages = await db
      .collection("Messages")
      .find({ channelId: channelId })
      .toArray();

    console.log(messages.length + " messages found!");

    return messages;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

// Creates a new message in the database
async function createMessage(message) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var result = await db.collection("Messages").insertOne(message);

    console.log("Inserted document with ID:", result.insertedId);
  } catch (err) {
    console.error("Error:", err);
    throw err;
  } finally {
    client.close();
  }
}

module.exports.createMessage = createMessage;
module.exports.getMessagesByChannelId = getMessagesByChannelId;
