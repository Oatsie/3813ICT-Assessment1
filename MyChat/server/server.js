const express = require('express');
const app = express();

const path = require('path');
const http = require('http').Server(app);
const bodyParser = require('body-parser');

app.use (bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist/my-chat/')))

let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Sever running!")
    console.log("Server listenning on: " +host + " port: " + port);
});