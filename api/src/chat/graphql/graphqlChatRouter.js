const fs = require("fs");
const path = require("path");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const {
  addMessage,
  getAllMessages,
  getMessagesByEmail,
} = require("./resolver");
const { Router } = require("express");

const schemaString = fs
  .readFileSync(path.join(__dirname, "message.gql"))
  .toString();
const compiledSchema = buildSchema(schemaString);
const { authenticateToken } = require("../../middlewares/auth");

const graphMiddleware = graphqlHTTP({
  schema: compiledSchema,
  rootValue: {
    addMessage,
    getAllMessages,
    getMessagesByEmail,
  },
  graphiql: true,
});

const graphqlChatRouter = Router();
graphqlChatRouter.use("/graphql/chat", authenticateToken, graphMiddleware);

module.exports = graphqlChatRouter;
