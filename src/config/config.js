"use strict";
exports.__esModule = true;
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var ingredient_entity_1 = require("../models/ingredient.entity");
var user_entity_1 = require("../models/user.entity");
var menu_entity_1 = require("../models/menu.entity");
var recipe_entity_1 = require("../models/recipe.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "chinese_menu_dev",
    synchronize: true,
    logging: true,
    entities: [ingredient_entity_1.Ingredient, menu_entity_1.Menu, recipe_entity_1.Recipe, user_entity_1.User],
    migrations: [],
    subscribers: []
});
