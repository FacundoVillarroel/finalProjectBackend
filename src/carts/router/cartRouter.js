const express = require("express");
const cartRouter= express();

cartRouter.use(express.json())

const CartService = require("../service/CartService");
const service = new CartService(process.env.DATA_BASE_CARTS)

const {authenticateToken, isAdmin} = require("../../middlewares/auth");

cartRouter.get("/", authenticateToken, async ( req, res ) => {
  const id = req.user.currentCartId
  const cart = await service.getCart(id)
  res.send(cart.products)
})

cartRouter.post("/:id", authenticateToken, async ( req, res ) => {
  const idcart = req.user.currentCartId
  const idProduct = req.params.id
  const quantity = req.body.quantity
  await service.addProductToCart( idcart, idProduct, quantity ) 
  res.send("Product added to cart successfully ")
})

cartRouter.delete("/:",authenticateToken, isAdmin, async ( req, res ) => {
  const id = req.user.currentCartId
  await service.deleteCart(id)
  res.send("cart deleted successfully")
})


module.exports = cartRouter