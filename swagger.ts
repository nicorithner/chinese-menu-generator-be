import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

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
  apis: ["./src/routes/*.routes.ts"],
};

const specs = swaggerJsdoc(options);

export const swaggerRoute = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
};
