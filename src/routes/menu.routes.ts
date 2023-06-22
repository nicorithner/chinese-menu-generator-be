import express from "express";
const app = express();

import { findAllMenus, findMenuById, createMenu, updateMenu, deleteMenu } from "../controllers/menu.controller";

module.exports = (app) => {
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

}