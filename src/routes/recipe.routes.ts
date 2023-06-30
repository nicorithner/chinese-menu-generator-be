import {
  findAllRecipes,
  findRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller";

module.exports = (app) => {

  /**
    * @swagger
    * components:
    *   schemas:
    *     Recipe:
    *       type: object
    *       required:
    *         - title
    *         - description
    *         - instructions
    *       properties:
    *         id:
    *           type: number
    *           description: Recipe primary key
    *         title:
    *           type: string
    *           description: Name of the recipe
    *         description:
    *           type: string
    *           description: Recipe description
    *         instructions:
    *           type: string
    *           description: Recipe instructions
    *         createdAt:
    *           type: string
    *           format: date
    *           description: The date the recipe was added
    *         updatedAt:
    *           type: string
    *           format: date
    *           description: The date the recipe was added
    *       example:
    *         id: 1
    *         title: "Delicious Recipe"
    *         description: "Something about this recipe....blah, blah, blah"
    *         instructions: "Step 1: ...., Step 2: ....., Step 3:..."
    */

  /**
   * @swagger
   * tags:
   *   name: Recipes
   *   description: Recipes API
   * /recipes:
   *   get:
   *     summary: Lists of recipes
   *     tags: [Recipes]
   *     responses:
   *       200:
   *         description: List all recipes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Recipe'
   *   post:
   *     summary: Create a recipe
   *     tags: [Recipes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Recipe'
   *     responses:
   *       200:
   *         description: Creates a recipe.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Recipe'
   *       500:
   *         description: Some server error
   * /recipes/{id}:
   *   get:
   *     summary: Get the recipe by id
   *     tags: [Recipes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The recipe id
   *     responses:
   *       200:
   *         description: The recipe response by id
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Recipe'
   *       500:
   *         description: Cannot find recipe with id=<recipe.id>
   *   put:
   *    summary: Update the recipe by the id
   *    tags: [Recipes]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: The recipe id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Recipe'
   *    responses:
   *      200:
   *        description: The recipe was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Recipe'
   *      500:
   *        description: Something went wrong while updating recipe with id=<recipe.id>
   *   delete:
   *     summary: Remove the recipe by id
   *     tags: [Recipes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The recipe id
   *
   *     responses:
   *       200:
   *         description: Recipe was deleted successfully!
   *       500:
   *         description: Couldn't delete recipe with id=$<recipe.id>
   *
   * /recipes/{id}/ingredients:
   *   get:
   *     summary: Get a list of recipe's ingredients
   *     tags: [Recipes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The recipe id
   *     responses:
   *        200:
   *         description: The recipe's list of ingredients response by recipe's id
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Ingredient'
   *        204: 
   *         description: No content 
   *        500:
   *         description: Cannot find recipe's list of ingredients
   */

  //Retrieve all recipes
  app.get("/recipes", findAllRecipes);

  //Retrieve a single recipe with id
  app.get("/recipes/:id", findRecipe);

  //Create a recipe
  app.post("/recipes", createRecipe);

  //Update a recipe with id
  app.put("/recipes/:id", updateRecipe);

  //Delete a recipe with id
  app.delete("/recipes/:id", deleteRecipe);

};
