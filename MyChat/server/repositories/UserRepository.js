
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'MyChat';

async function getAllUsers() {
  const client = new MongoClient(url);  
  
  try {
        await client.connect();
        console.log("Connected successfully to server!");

        const db = client.db(dbName);
        var users = await db.collection("Users").find().toArray();;

        return users; // Return the roles list
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        throw err; // Rethrow the error
    } finally {
        client.close();
    }
}

async function getUserById(id) {
    const client = new MongoClient(url);  
  
    try {
          await client.connect();
          console.log("Connected successfully to server!");
  
          const db = client.db(dbName);
          var users = await db.collection("Users").findOne({_id: id}).toArray();;
  
          return users; // Return the roles list
      } catch (err) {
          console.error("Error connecting to MongoDB:", err);
          throw err; // Rethrow the error
      } finally {
          client.close();
      }
  }

  async function createUser(user) {
    const client = new MongoClient(url);  
  
    try {
          await client.connect();
          console.log("Connected successfully to server!");
  
          const db = client.db(dbName);
          var result = await db.collection("Users").insertOne(user);
  
          console.log("Inserted document with ID:", result.insertedId);
        } catch (err) {
          console.error("Error:", err);
          throw err;
        } finally {
          client.close();
        }
  }

  async function updateUser(user) {
    const client = new MongoClient(url);  
  
    try {
          await client.connect();
          console.log("Connected successfully to server!");
  
          const db = client.db(dbName);
          var users = await db.collection("Users").findOne({_id: id}).toArray();;
  
          return users; // Return the roles list
      } catch (err) {
          console.error("Error connecting to MongoDB:", err);
          throw err; // Rethrow the error
      } finally {
          client.close();
      }
  }

async function deleteUser(id) {
    const client = new MongoClient(url);  
  
    try {
          await client.connect();
          console.log("Connected successfully to server!");
  
          const db = client.db(dbName);
          var users = await db.collection("Users").findOne({_id: id}).toArray();;
  
          return users; // Return the roles list
      } catch (err) {
          console.error("Error connecting to MongoDB:", err);
          throw err; // Rethrow the error
      } finally {
          client.close();
      }
  }

  module.exports.getAllUsers = getAllUsers
  module.exports.createUser = createUser
  module.exports.getUserById = getUserById
  module.exports.updateUser = updateUser
  module.exports.deleteUser = deleteUser