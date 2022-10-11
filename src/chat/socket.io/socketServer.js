const MessagesService = require("../service/MessagesService");
const service = new MessagesService (process.env.DATA_BASE_MESSAGES)

const socketServer = async ( io, socket ) => {
  console.log("User connected");
  let messages = await service.getAllMessages()
  socket.emit("messages", messages)

  socket.on("new_message", async ( message ) => {
    await service.addMessage(message)
    messages.push(message)
    io.sockets.emit("messages", messages)
  })
}

module.exports = socketServer