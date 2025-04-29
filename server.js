const app = require("./api/index");
const PORT = process.env.PORT || 8080;

const cluster = require("cluster");

const os = require("os");
const numCPU = os.cpus().length;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const socketServer = require("./api/src/chat/socket.io/socketServer");

io.on("connection", (socket) => {
  socketServer(io, socket);
});

if (process.env.MODE == "cluster") {
  if (cluster.isPrimary) {
    for (let i = 0; i < numCPU; i++) {
      cluster.fork();
    }
  } else {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${server.address().port}`);
    });
  }
} else {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`);
  });
}
