
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'MyChat';

async function getAllChannels() {
  const client = new MongoClient(url);  
  
  try {
        await client.connect();
        console.log("Connected successfully to server!");

        const db = client.db(dbName);
        var channels = await db.collection("Channels").find().toArray();;

        return channels; // Return the roles list
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; // Rethrow the error
    } finally {
        client.close();
    }
}

async function getChannelById(id) {
    const client = new MongoClient(url);  
  
    try {
          await client.connect();
          console.log("Connected successfully to server!");
  
          const db = client.db(dbName);
          var channels = await db.collection("Channels").findOne({_id: id}).toArray();;
  
          return channels; // Return the roles list
      } catch (err) {
          console.error("Error connecting to MongoDB:", err);
          throw err; // Rethrow the error
      } finally {
          client.close();
      }
  }

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

  async function updateChannel(channel) {
    const client = new MongoClient(url);  
  
    try {
          await client.connect();
          console.log("Connected successfully to server!");
  
          const db = client.db(dbName);
          var channels = await db.collection("Channels").findOne({_id: id}).toArray();;
  
          return channels; // Return the roles list
      } catch (err) {
          console.error("Error connecting to MongoDB:", err);
          throw err; // Rethrow the error
      } finally {
          client.close();
      }
  }

async function deleteChannel(id) {
    const client = new MongoClient(url);  
  
    try {
          await client.connect();
          console.log("Connected successfully to server!");
  
          const db = client.db(dbName);
          var channels = await db.collection("Channels").findOne({_id: id}).toArray();;
  
          return channels; // Return the roles list
      } catch (err) {
          console.error("Error connecting to MongoDB:", err);
          throw err; // Rethrow the error
      } finally {
          client.close();
      }
  }

  module.exports.getAllChannels = getAllChannels
  module.exports.createChannel = createChannel
  module.exports.getChannelById = getChannelById
  module.exports.updateChannel = updateChannel
  module.exports.deleteChannel = deleteChannel