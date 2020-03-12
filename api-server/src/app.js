const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res) {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", function(socket) {
  console.log("a user connected");
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
