const express = require('express');
require('dotenv').config();
const db = require('./db');
const routes = require('./routes');
const cors = require('cors')
swaggerDocument = require("./swagger.json");
const swaggerUI = require("swagger-ui-express");

const app = express();
app.use(express.json());
app.use(routes);
app.use(cors())

const port = process.env.SERVER_PORT || 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, async () => {
    await db.connect();
    console.log(`server open at http://localhost:${port}`);
})