require("dotenv").config()

const express = require("express");
const cookieParser = require("cookie-parser")
const userRouter = require("./src/users/router/userRouter")
const productRouter = require("./src/products/router/productRouter");
const cartRouter = require("./src/carts/router/cartRouter");

const app = express()
app.set("view-engine","ejs")
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use(userRouter)
app.use("/products",productRouter)
app.use("/cart", cartRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})