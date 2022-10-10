const express = require("express");
const chatRouter = express.Router();

chatRouter.use(express.json())

const {authenticateToken} = require("../../middlewares/auth")

chatRouter.get("/", authenticateToken, ( req, res ) => {
  res.render("chat.ejs", {name:req.user.name, admin: req.user.admin})
})

module.exports = chatRouter