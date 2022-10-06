const express = require("express");
const userRouter = express();

userRouter.use(express.json())
userRouter.use(express.urlencoded({extended:false}));

const {registration, authenticationCheck, authenticateToken} = require("../../middlewares/auth")

userRouter.get("/" , authenticateToken , ( req, res ) => {
  if (req.user){
    res.send("WELCOME")
  } else {
    res.redirect("/login")
  }
})

userRouter.get("/register", authenticateToken, ( req, res ) => {
  if(req.user){
    res.redirect("/")
  } else {
    res.render("register.ejs")
  }
})

userRouter.post("/register", registration, ( req, res ) => {
  res.send("User created")
})

userRouter.get("/login", authenticateToken, ( req, res) => {
  if(req.user){
    res.redirect("/")
  } else {
    res.render("login.ejs")
  }
})

userRouter.post("/login", authenticationCheck, ( req, res ) => {
  res.redirect("/products")
})

module.exports = userRouter