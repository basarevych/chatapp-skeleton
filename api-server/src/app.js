const path = require("path");
const express = require("express");
const http = require("http");

require("dotenv").config({ path: path.join(__dirname, "..", "/.env") });

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.resolve(process.env.DIST_DIR)));

io.on("connection", function(socket) {
  console.log("a user connected");
});

server.listen(3000, function() {
  console.log("listening on *:3000");
});
