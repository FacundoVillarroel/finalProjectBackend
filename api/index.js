require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRouter = require("./src/users/router/userRouter");
const productRouter = require("./src/products/router/productRouter");
const cartRouter = require("./src/carts/router/cartRouter");
const orderRouter = require("./src/orders/router/orderRouter");
/* const chatRouter = require("./src/chat/router/messagesRouter"); */
const routes = require("./src/routes/routes");
const graphqlProductRouter = require("./src/products/graphql/graphqlProductRouter");
const graphqlChatRouter = require("./src/chat/graphql/graphqlChatRouter");
const graphqlOrdersRouter = require("./src/orders/graphql/graphqlOrdersRouter");
const graphqlUsersRouter = require("./src/users/graphql/graphqlUserRouter");
const graphqlCartsRouter = require("./src/carts/graphql/graphqlCartsRouter");

const app = express();

const reqInfo = require("./src/logs/reqInfo");
const { authenticateToken, isAdmin } = require("./src/middlewares/auth");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(reqInfo);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/info", authenticateToken, isAdmin, routes.getInfo);
app.use(userRouter);
app.use(graphqlProductRouter);
app.use(graphqlChatRouter);
app.use(graphqlOrdersRouter);
app.use(graphqlUsersRouter);
app.use(graphqlCartsRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
/* app.use("/chat", chatRouter); */
app.use("/options", authenticateToken, isAdmin, routes.getOptions);

app.use(routes.error);

module.exports = app;
