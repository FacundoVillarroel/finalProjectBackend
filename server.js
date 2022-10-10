require("dotenv").config()

const express = require("express");
const cookieParser = require("cookie-parser")
const userRouter = require("./src/users/router/userRouter")
const productRouter = require("./src/products/router/productRouter");
const cartRouter = require("./src/carts/router/cartRouter");
const orderRouter = require("./src/orders/router/orderRouter");
const chatRouter = require("./src/chat/router/messagesRouter");

const app = express()

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const socketServer = require("./src/chat/socket.io/socketServer")

app.set("view-engine","ejs")

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use(userRouter)
app.use("/products",productRouter)
app.use("/cart", cartRouter)
app.use("/orders", orderRouter)
app.use("/chat", chatRouter)

io.on('connection', (socket) => {
  socketServer(io, socket)
});

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

