import {
  findAllIngredients,
  findIngredientById,
  createIngredient,
  deleteIngredient,
  updateIngredient,
} from "../controllers/ingredients.controller";

module.exports = (app) => {
  /**
    * @swagger
    * components:
    *   schemas:
    *     Ingredient:
    *       type: object
    *       required:
    *         - name
    *       properties:
    *         id:
    *           type: number
    *           description: Ingredient primary key
    *         name:
    *           type: string
    *           description: Name of the ingredient
    *         createdAt:
    *           type: string
    *           format: date
    *           description: The date the ingredient was added
    *         updatedAt:
    *           type: string
    *           format: date
    *           description: The date the ingredient was added
    *       example:
    *         id: 1
    *         name: carrot
    */

  /**
   * @swagger
   * tags:
   *   name: Ingredients
   *   description: Ingredients API
   * /ingredients:
   *   get:
   *     summary: Lists of ingredients
   *     tags: [Ingredients]
   *     responses:
   *       200:
   *         description: List all ingredients
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Ingredient'
   *   post:
   *     summary: Create a ingredient
   *     tags: [Ingredients]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Ingredient'
   *     responses:
   *       200:
   *         description: Creates a ingredient.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Ingredient'
   *       500:
   *         description: Some server error
   * /ingredients/{id}:
   *   get:
   *     summary: Get the ingredient by id
   *     tags: [Ingredients]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The ingredient id
   *     responses:
   *       200:
   *         description: The ingredient response by id
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Ingredient'
   *       500:
   *         description: Cannot find ingredient with id=<ingredient.id>
   *   put:
   *    summary: Update the ingredient by the id
   *    tags: [Ingredients]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: The ingredient id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Ingredient'
   *    responses:
   *      200:
   *        description: The ingredient was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Ingredient'
   *      500:
   *        description: Something went wrong while updating ingredient with id=<ingredient.id>
   *   delete:
   *     summary: Remove the ingredient by id
   *     tags: [Ingredients]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The ingredient id
   *
   *     responses:
   *       200:
   *         description: Ingredient was deleted successfully!
   *       500:
   *         description: Couldn't delete ingredient with id=$<ingredient.id>
   */


  // ---- Routes

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
