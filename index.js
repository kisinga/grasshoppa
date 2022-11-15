const express = require("express");
const PORT = 8080;
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);
var { read } = require("./read");

app.get("/", function (req, res) {
    const _ = read();
    res.sendFile(path.join(__dirname + "/index.html"));
});

io.on("connection", (socket) => {
    console.log("IO connected node");
});

setInterval(() => {
    io.emit("powerMsg", read());
}, 1000);

server.listen(PORT, function () {
    console.log(`Server is running on port: ${PORT}: `);
});
