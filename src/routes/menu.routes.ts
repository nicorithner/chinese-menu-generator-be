import express from "express";
const app = express();

import { findAllMenus, findMenuById, createMenu, updateMenu, deleteMenu, deleteMenuRecipe } from "../controllers/menu.controller";

module.exports = (app) => {
  /**
* @swagger
* components:
*   schemas:
*     Menu:
*       type: object
*       required:
*         - name
*       properties:
*         id:
*           type: number
*           description: Menu primary key
*         name:
*           type: string
*           description: Name of the menu
*         createdAt:
*           type: string
*           format: date
*           description: The date the menu was added
*         updatedAt:
*           type: string
*           format: date
*           description: The date the menu was added
*       example:
*         id: 1
*         name: spicy fish
*/

  /**
   * @swagger
   * tags:
   *   name: Menus
   *   description: Menus API
   * /menus:
   *   get:
   *     summary: Lists of menus
   *     tags: [Menus]
   *     responses:
   *       200:
   *         description: List all menus
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Menu'
   *   post:
   *     summary: Create a menu
   *     tags: [Menus]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Menu'
   *     responses:
   *       200:
   *         description: Creates a menu.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Menu'
   *       500:
   *         description: Some server error
   * /menus/{id}:
   *   get:
   *     summary: Get the menu by id
   *     tags: [Menus]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The menu id
   *     responses:
   *       200:
   *         description: The menu response by id
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Menu'
   *       500:
   *         description: Cannot find menu with id=<menu.id>
   *   put:
   *    summary: Update the menu by the id
   *    tags: [Menus]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: number
   *        required: true
   *        description: The menu id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Menu'
   *    responses:
   *      200:
   *        description: The menu was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Menu'
   *      500:
   *        description: Something went wrong while updating menu with id=<menu.id>
   *   delete:
   *     summary: Remove the menu by id
   *     tags: [Menus]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: number
   *         required: true
   *         description: The menu id
   *
   *     responses:
   *       200:
   *         description: Menu was deleted successfully!
   *       500:
   *         description: Couldn't delete menu with id=$<menu.id>
   */

  //Retrive all menus
  app.get("/menus", findAllMenus);

  //Retrieve one menu by id
  app.get("/menus/:id", findMenuById);

  //Create one menu
  app.post("/menus", createMenu)

  //Update a menu with id
  app.put("/menus/:id", updateMenu)

  //Delete a menu with id
  app.delete("/menus/:id", deleteMenu)

  //Delete recipe from the menu
  app.delete("/menus/:id/:recipeId", deleteMenuRecipe)
}