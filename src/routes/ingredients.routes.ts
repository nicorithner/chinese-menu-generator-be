import express from "express";
import {
  findAllIngredients,
  findIngredientById,
  createIngredient,
  deleteIngredient,
} from "../controllers/ingredients.controller";
const app = express();
app.use(express.json());

module.exports = (app) => {
  // Create a new ingredient
  app.post("/ingredients", createIngredient);

  // Retrieve all ingredients
  app.get("/ingredients", findAllIngredients);

  // Retrieve a single ingredient with id
  app.get("/ingredients/:id", findIngredientById);

  // Delete a ingredient with id
  app.delete("/ingredients/:id", deleteIngredient);
};
