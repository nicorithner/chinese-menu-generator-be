import {
  findAllRecipes,
  findRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller";

module.exports = (app) => {
  // Retrieve all networks
  app.get("/recipes", findAllRecipes);

  // Retrieve a single recipe with id
  app.get("/recipes/:id", findRecipe);

  //Create a recipe
  app.post("/recipes", createRecipe);

  // Update a recipe with id
  app.put("/recipes/:id", updateRecipe);

  // Delete a network with id
  app.delete("/recipes/:id", deleteRecipe);
};
