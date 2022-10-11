const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const UserService = require("../users/service/UserService")
const userService = new UserService(process.env.DATA_BASE_USERS)

const CartService = require("../carts/service/CartService");
const { sendEmailNewUser } = require("../nodemailer/helpers/helpers");
const cartService = new CartService(process.env.DATA_BASE_CARTS)

const registration = async ( req, res, next ) => {
  if(req.body.password !== req.body.repeatPassword){
    res.render("failRegister.ejs", {error:"the passwords doesn't match"})
  } else {
    try{
      const hashedPasword = await bcrypt.hash(req.body.password,10)
      const idCart = await cartService.createCart(req.body.email, req.body.address)
      const user = {
        email: req.body.email ,
        name: req.body.name,
        surname: req.body.surname,
        tel: req.body.tel,
        address:req.body.address,
        password:hashedPasword,
        currentCartId: idCart
      }

      await userService.addNewUser(user)
      sendEmailNewUser(process.env.GMAIL_ADMIN, process.env.GMAIL_RECIEVER, user )
      next()
    } catch(err){
      res.status(500).send({error: err})
    }
  }
}

const authenticationCheck = async (req, res, next ) => {
  let user = await userService.findUser(req.body.email)
  if (user === undefined ) {
    return res.status(404).render("failLogin.ejs", {error: `There isnt an account with the email: ${req.body.email}`})
  }
  try{
    user = user.toJSON()
    if(await bcrypt.compare(req.body.password, user.password)){
      const accessToken = generateAccessToken(user)
      res.clearCookie("token")
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
  if(req.originalUrl === "/login" || req.originalUrl === "/register"){
    if (token){
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (!err) {
          res.redirect("/products")
        } else {
          next()
        }
      })
    } else{
      next()
    }
  } else {
    if (token){
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (!err) {
          req.user = user
          const {email, name, surname, tel, password, admin, currentCartId, address} = user 
          const accessToken = generateAccessToken({email, name, surname, tel, password, admin, currentCartId, address})
          res.cookie("token",accessToken, {
            httpOnly:true
          })
          next()
        } else {
          res.redirect("/login")
        }
      })
    } else{
      res.redirect("/login")
    }
  }
}

const isAdmin = ( req, res, next ) => {
  if(req.user.admin){
    next()
  } else {
    res.status(403).send({error: "You do not have admin permissions for this request"})
  } 
}


function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRING_TIME })
}

module.exports = {registration, authenticationCheck, authenticateToken, isAdmin}