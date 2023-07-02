import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

//routes

app.get("/", (_req: Request, res: Response): Response => {
  return res.status(200).json({ message: "Hello World!" });
});

import { ingredientRoutes } from "./routes/ingredients.routes";
import { userRoutes } from "./routes/user.routes";
import { menuRoutes } from "./routes/menu.routes";
import { recipeRoutes } from "./routes/recipe.routes";
import { swaggerRoute } from "../swagger";

userRoutes(app);
ingredientRoutes(app);
recipeRoutes(app);
menuRoutes(app);
swaggerRoute(app);

export default app;
