const express = require("express");
const itemRoutes = require("./src/api/routes/itemRoute");
const app = express();

const { connectDatabase } = require("./src/config/database");
app.use(express.json());
connectDatabase(app);
app.use("/api/location", itemRoutes);
