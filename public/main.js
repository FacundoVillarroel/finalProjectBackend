const socket = io();

const userForm = document.getElementById("userMessageForm")
const inputUserMessage = document.getElementById("userMessage")
const systemForm = document.getElementById("systemMessageForm")
const inputSystemMessage = document.getElementById("systemMessage")
const email = (document.getElementById("email")).innerHTML
const selectEmail = document.getElementById("selectEmail")

if(userForm){
  userForm.addEventListener("submit", (e) => {
    e.preventDefault()
  
    const messageContent = inputUserMessage.value
    const userMessage = {
      email:email,
      type:"user",
      date: new Date(),
      message:messageContent
    }
    socket.emit("new_message", userMessage)
    inputUserMessage.value = ""
  })
}

if(systemForm) {
  systemForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const emailToAnswer = selectEmail.value
    const messageContent = inputSystemMessage.value
    const systemMessage = {
      email: emailToAnswer,
      type: "system",
      date: new Date(),
      message: messageContent
    }
    socket.emit("new_message", systemMessage);
    selectEmail.value = "";
    inputSystemMessage.value = "";
  })
}

const createTagMessage = (message) => {
  if (message.type === "user"){
    return( `
      <li style= "display: flex; width:50%; justify-content: space-around">
        <p>${message.email}: ${message.message} </p>
        <p style="margin-left: 20px"> date: ${message.date} </p>
      </li>
    `)
  } else {
    return ( `
    <hr>
    <li style= "display: flex; width:50%; justify-content: space-around">
      <p> System: ${message.message} </p>
      <p> date: ${message.date} - answered to ${message.email} </p>
    </li>
    <hr>
  `)
  }
}

const createOptionTags = ( messages ) => {
  if (selectEmail){
    while (selectEmail.firstChild) {
      selectEmail.removeChild(myNode.lastChild);
    }
    const emails = getEmails( messages )
    emails.forEach( email => {
      const newOption = document.createElement("option")
      const optionText = document.createTextNode(email)
      newOption.appendChild(optionText)
      selectEmail.appendChild(newOption)
    })
  }
}

const getEmails = ( messages ) => {
  let newList = []
  messages.forEach(item => {
    if (!(newList.includes(item.email))) {
      newList.push(item.email)
    }
  });
  return newList
}

const renderMessages = (messages) => {
  const messagesList = messages.map(message => createTagMessage(message)).join(" ");
  const messageContainer = document.getElementById("messagesContainer")
  if(messageContainer) messageContainer.innerHTML = messagesList;
  createOptionTags(messages)
}

socket.on("messages", (messages) => {
  renderMessages(messages)
})