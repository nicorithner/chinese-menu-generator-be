import express from "express";
const app = express();
app.use(express.json());

//routes
const ingredientRoutes = require("./routes/ingredients.routes");
const userRoutes = require("./routes/user.routes");
userRoutes(app)
ingredientRoutes(app);

export default app;
