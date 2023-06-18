import { findAllUsers, findUser, createUser, updateUser, deleteUser } from "../controllers/user.controller";

module.exports = (app) => {
    // Retrieve all networks
    app.get("/users", findAllUsers);

    // Retrieve a single user with id
    app.get("/users/:id", findUser);

    //Create a user 
    app.post("/users", createUser);

    // Update a user with id
    app.put("/users/:id", updateUser);

    // Delete a network with id
    app.delete("/users/:id", deleteUser);
}




