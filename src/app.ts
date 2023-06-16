import express from "express";
const app = express();
app.use(express.json());

const ingredientRoutes = require("./routes/ingredients.routes");
ingredientRoutes(app);

export default app;
