const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

let users = [];

const registration = async ( req, res, next ) => {
  if(req.body.password !== req.body.repeatPassword){
    res.render("failRegister.ejs", {error:"the passwords doesn't match"})
  } else {
    try{
      const hashedPasword = await bcrypt.hash(req.body.password,10)
      const user = {
        email: req.body.email ,
        name: req.body.name,
        surname: req.body.surname,
        tel: req.body.tel,
        password:hashedPasword
      }
      users.push(user)
      next()
    } catch{
      res.status(500).send()
    }
  }
}

const authenticationCheck = async (req, res, next ) => {
  if (users.length === 0){
    return res.status(404).render("failLogin.ejs",{error: "there are no users registered"})
  }
  const user = users.find(user => user.email === req.body.email)
  if (user === undefined ) {
    return res.status(404).render("failLogin.ejs", {error: `There isnt an account with the email: ${req.body.email}`})
  }
  try{
    if(await bcrypt.compare(req.body.password, user.password)){
      const accessToken = generateAccessToken(user)
      res.cookie("token",accessToken, {
        httpOnly:true
      })
      next()
    } else{
      res.render("failLogin.ejs",{error: "Incorrect Password"})
    }
  }catch(err){
    console.log(err);
    res.sendStatus(500).send()
  }
}

const authenticateToken = ( req, res, next ) => {
  const token = req.cookies.token
  if (token){
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        req.user = null
      } else {
        req.user = user
      }
    })
  } else{
    req.user = null
  }
  next()
}


function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRING_TIME })
}

module.exports = {registration, authenticationCheck, authenticateToken}