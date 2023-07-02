"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var dotenv_1 = require("dotenv");
require("reflect-metadata");
var config_1 = require("./config/config");
dotenv_1["default"].config();
config_1.AppDataSource.initialize()
    .then(function () {
    console.log("Data Source has been initialized successfully.");
})["catch"](function (err) {
    console.error("Error during Data Source initialization:", err);
});
//port
var port = process.env.PORT;
app_1["default"].listen(port, function () { return console.log("running on port ".concat(port)); });
