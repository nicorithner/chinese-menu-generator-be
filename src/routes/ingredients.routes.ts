import {
  findAllIngredients,
  findIngredientById,
  createIngredient,
  deleteIngredient,
  updateIngredient,
} from "../controllers/ingredients.controller";

module.exports = (app) => {
  // Create a new ingredient
  app.post("/ingredients", createIngredient);

  // Retrieve all ingredients
  app.get("/ingredients", findAllIngredients);

  // Retrieve a single ingredient with id
  app.get("/ingredients/:id", findIngredientById);

  // Update a single ingredient with id
  app.put("/ingredients/:id", updateIngredient);

  // Delete a ingredient with id
  app.delete("/ingredients/:id", deleteIngredient);
};
