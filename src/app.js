"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
//routes
app.get("/", function (_req, res) {
    return res.status(200).json({ message: "Hello World!" });
});
var ingredientRoutes = require("./routes/ingredients.routes");
var userRoutes = require("./routes/user.routes");
var menuRoutes = require("./routes/menu.routes");
var recipeRoutes = require("./routes/recipe.routes");
var swaggerRoute = require("../swagger.ts");
userRoutes(app);
ingredientRoutes(app);
recipeRoutes(app);
menuRoutes(app);
swaggerRoute(app);
exports["default"] = app;
