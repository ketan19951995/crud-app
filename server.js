const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var jwt = require('jsonwebtoken');

const { saveUser, getUserByEmail, getAllUsers , deleteRecord } = require('./db');
const { MongoClient } = require("mongodb")
const client = new MongoClient("mongodb://localhost:27017");


app.post('/register', jsonParser, async (req, res) => {
    console.log("req is", req.body);
    let user = {};
    let { email, password } = req.body;

    //check whether user already exists or not
    let getuserInfo = await getUserByEmail(email, client);
    console.log("getUSER", getuserInfo);
    if (getuserInfo) {
        res.json({ "message": "User already registered" });
    } else {
        let hashPassword = await bcrypt.hash(password, saltRounds)
        console.log("hashpassowrd", hashPassword);
        user.password = hashPassword;
        user.email = email;
        console.log("user::::::::", user);
        let result = await saveUser(user, client);
        console.log("result is", result);
        if (result && result.statusCode == 200) {
            res.json({ "message": result.message });
        } else {
            res.json({ "message": "User not registered" });
        }
    }
});





app.post('/login', jsonParser, async (req, res) => {
    let { email, password } = req.body;
    let getuserInfo = await getUserByEmail(email, client);
    console.log("getUSER", getuserInfo);
    if (!getuserInfo) {
        res.json({ "message": "User not registered" });
    } else {
        let userStoredPassword = getuserInfo.password;
        // decrypt password
        const match = await bcrypt.compare(password, userStoredPassword);
        console.log("amtch", match);
        if (match) {

            let token = jwt.sign({ email }, 'test-123');
            console.log("toek", token);
            res.json({ "message": "Login Sucessfully", authorizationCode: token });
        } else {
            res.json({ "message": "Wrong email or password" });
        }
    }
});



app.get('/users', async (req, res) => {
    console.log("req,headers", req.headers);
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, 'test-123');
    console.log("decoded", decoded) // bar
    if (decoded.email) {
        let result = await getAllUsers(client);
        console.log("result", result);
        res.json({ "records": result });
    }

})


app.delete('/user', jsonParser ,  async (req, res) => {
    let { email } = req.body;
    let result = await deleteRecord(email, client);
    console.log("result us", result);
    if(result.deletedCount){
        res.json({ "message": "Record Deleted" });
    }else {
        res.json({ "message": "No account exists with this email ID" });
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});