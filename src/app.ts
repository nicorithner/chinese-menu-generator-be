import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

//routes

app.get("/", (_req: Request, res: Response): Response => {
  return res.status(200).json({ message: "Hello World!" });
});

const ingredientRoutes = require("./routes/ingredients.routes");
const userRoutes = require("./routes/user.routes");
const recipeRoutes = require("./routes/recipe.routes");
const swaggerRoute = require("../swagger.ts");
userRoutes(app);
ingredientRoutes(app);
recipeRoutes(app);
swaggerRoute(app);

export default app;
