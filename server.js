require("dotenv").config()

const express = require("express");
const cookieParser = require("cookie-parser")
const userRouter = require("./src/users/router/userRouter")

const app = express()
app.set("view-engine","ejs")
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use(userRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})