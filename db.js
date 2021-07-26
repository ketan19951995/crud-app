async function saveUser(user, client) {
     await client.connect();
     const database = client.db("Users");
     const collection = database.collection("users");
     await collection.insertOne(user);
     return { statusCode: 200, message: "User inserted successfully" };
}


async function getUserByEmail(email, client) {
     await client.connect();
     const database = client.db("Users");
     const collection = database.collection("users");
     let query = { email }
     let result = await collection.findOne(query);
     return result;
}


async function getAllUsers(client) {
     await client.connect();
     const database = client.db("Users");
     const collection = database.collection("users");
     let result = await collection.find({}).toArray();
     return result;
}


async function deleteRecord(email, client) {
     await client.connect();
     const database = client.db("Users");
     const collection = database.collection("users");
     let myquery = { email };
     let result = await collection.deleteOne(myquery);
     return result;
}


module.exports = {
     saveUser,
     getUserByEmail,
     getAllUsers,
     deleteRecord
}