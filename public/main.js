const socket = io();

const userForm = document.getElementById("userMessageForm")
const inputUserMessage = document.getElementById("userMessage")

userForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const message = inputUserMessage.value
  const userMessage = {
    email: "fake@email.com",
    type:"user",
    date: new Date(),
    message:message
  }
  socket.emit("new_message", userMessage)
})
const createTagMessage = (message) => {
      return( `
        <li>
          <p>${message.email} says: ${message.message} </p>
          <p> date: ${message.date} </p>
        </li>
      `)
}

const renderMessages = (messages) => {
  const messagesList = messages.map(message => createTagMessage(message)).join(" ");
  console.log("lista", messagesList);
  const messageContainer = document.getElementById("messagesContainer")
  if(messageContainer) messageContainer.innerHTML = messagesList;
}

socket.on("messages", (messages) => {
  renderMessages(messages)
})