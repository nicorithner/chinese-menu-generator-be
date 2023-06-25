import { findAllUsers, findUserByID, createUser, updateUser, deleteUser, findUserMenus } from "../controllers/user.controller";

module.exports = (app) => {

    /**
  * @swagger
  * components:
  *   schemas:
  *     User:
  *       type: object
  *       required:
  *         - name
  *       properties:
  *         id:
  *           type: number
  *           description: User primary key
  *         firstName:
  *           type: string
  *           description: First Name of the user
  *         lastName:
  *           type: string
  *           description: Last Name of the user
  *         createdAt:
  *           type: string
  *           format: date
  *           description: The date the user was added
  *         updatedAt:
  *           type: string
  *           format: date
  *           description: The date the user was added
  *       example:
  *         id: 1
  *         firstName: Lingling
  *         lastName: Gan
  */

    /**
     * @swagger
     * tags:
     *   name: Users
     *   description: Users API
     * /users:
     *   get:
     *     summary: Lists of users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: List all users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     *   post:
     *     summary: Create a user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: Creates a user.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Some server error
     * /users/{id}:
     *   get:
     *     summary: Get the user by id
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: number
     *         required: true
     *         description: The user id
     *     responses:
     *       200:
     *         description: The user response by id
     *         contents:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Cannot find user with id=<user.id>
     * 
     *   put:
     *    summary: Update the user by the id
     *    tags: [Users]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: number
     *        required: true
     *        description: The user id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/User'
     *    responses:
     *      200:
     *        description: The user was updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
     *      500:
     *        description: Something went wrong while updating user with id=<user.id>
     *   delete:
     *     summary: Remove the user by id
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: number
     *         required: true
     *         description: The user id
     *
     *     responses:
     *       200:
     *         description: User was deleted successfully!
     *       500:
     *         description: Couldn't delete user with id=$<user.id>
     * 
     * /users/{id}/menus:
     *   get:
     *     summary: Get a list of user's menus
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: number
     *         required: true
     *         description: The user id
     *     responses:
     *       200:
     *         description: The user's list of menu response by user's id
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Menu'
     *       204: 
     *         description: No content 
     *       500:
     *         description: Cannot find user's list of Menus
     */

    // Retrieve all networks
    app.get("/users", findAllUsers);

    // Retrieve a single user with id
    app.get("/users/:id", findUserByID);

    //Create a user 
    app.post("/users", createUser);

    // Update a user with id
    app.put("/users/:id", updateUser);

    // Delete a network with id
    app.delete("/users/:id", deleteUser);

    //find users' menu
    app.get("/users/:id/menus", findUserMenus);
}




