require("dotenv").config()

const express = require("express");
const cookieParser = require("cookie-parser")

const app = express()
app.set("view-engine","ejs")
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

const {registration, authenticationCheck, authenticateToken} = require("./src/middlewares/auth")

app.get("/" , authenticateToken , ( req, res ) => {
  if (req.user){
    res.send("WELCOME")
  } else {
    res.redirect("/login")
  }
})

app.get("/login", authenticateToken, ( req, res) => {
  if(req.user){
    res.redirect("/")
  } else {
    res.render("login.ejs")
  }
})

app.get("/register", authenticateToken, ( req, res) => {
  if(req.user){
    res.redirect("/")
  } else {
    res.render("register.ejs")
  }
})

app.post("/register", registration, ( req, res ) => {
  res.send("User created")
})

app.post("/login", authenticationCheck, ( req, res ) => {
  res.redirect("/products")
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})