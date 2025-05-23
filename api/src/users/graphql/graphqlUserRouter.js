const fs = require("fs");
const path = require("path");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { Router } = require("express");
const {
  addNewUser,
  findUser,
  updateCurrentCartId,
  getAllUsers,
} = require("./resolver");

const schemaString = fs
  .readFileSync(path.join(__dirname, "users.gql"))
  .toString();
const compiledSchema = buildSchema(schemaString);
const { authenticateToken, isAdmin } = require("../../middlewares/auth");

const graphMiddleware = graphqlHTTP({
  schema: compiledSchema,
  rootValue: {
    addNewUser,
    findUser,
    updateCurrentCartId,
    getAllUsers,
  },
  graphiql: true,
});

const graphqlUsersRouter = Router();
graphqlUsersRouter.use(
  "/graphql/users",
  authenticateToken,
  isAdmin,
  graphMiddleware
);

module.exports = graphqlUsersRouter;
