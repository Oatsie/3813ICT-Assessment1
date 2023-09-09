const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = "MyChat";

async function getAllMessages() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var messages = await db.collection("Messages").find().toArray();

    return messages;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

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

async function getMessageById(id) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var messages = await db
      .collection("Messages")
      .findOne({ _id: id })
      .toArray();

    return messages;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

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

async function updateMessage(message) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var messages = await db
      .collection("Messages")
      .findOne({ _id: id })
      .toArray();

    return messages;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

async function deleteMessage(id) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to server!");

    const db = client.db(dbName);
    var messages = await db
      .collection("Messages")
      .findOne({ _id: id })
      .toArray();

    return messages;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  } finally {
    client.close();
  }
}

module.exports.getAllMessages = getAllMessages;
module.exports.createMessage = createMessage;
module.exports.getMessageById = getMessageById;
module.exports.updateMessage = updateMessage;
module.exports.deleteMessage = deleteMessage;
module.exports.getMessagesByChannelId = getMessagesByChannelId;
