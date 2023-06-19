const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chinese Menu Generator",
      version: "1.0.0",
      description:
        "This API serves Chinese cuisine menus based on a selection of ingredients provided by the user",
    },
  },
  apis: ["./app/routes/*.routes.ts"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
};
