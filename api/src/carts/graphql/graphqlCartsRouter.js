const fs = require("fs");
const path = require("path");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { Router } = require("express");
const {
  getCart,
  createCart,
  addProductToCart,
  deleteProductFromCart,
  deleteCart,
} = require("./resolver");

const schemaString = fs
  .readFileSync(path.join(__dirname, "carts.gql"))
  .toString();
const compiledSchema = buildSchema(schemaString);
const { authenticateToken } = require("../../middlewares/auth");

const graphMiddleware = graphqlHTTP({
  schema: compiledSchema,
  rootValue: {
    getCart,
    createCart,
    addProductToCart,
    deleteProductFromCart,
    deleteCart,
  },
  graphiql: true,
});

const graphqlCartsRouter = Router();
graphqlCartsRouter.use("/graphql/carts", authenticateToken, graphMiddleware);

module.exports = graphqlCartsRouter;
