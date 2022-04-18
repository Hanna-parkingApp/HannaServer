const express = require('express');
require('dotenv').config();
const db = require('./db');
const routes = require('./routes');
swaggerDocument = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");

const userService = require('./Services/user.service')

const app = express();
app.use(express.json());
app.use(routes);

const port = process.env.SERVER_PORT || 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, async () => {
    await db.connect();
    console.log(await userService.getUser({email: "bla@gmail.com"}))
    console.log(`server open at http://localhost:${port}`);
})