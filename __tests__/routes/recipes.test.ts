import request from "supertest";
import { DataSource } from "typeorm";

import app from "../../src/app";
import { AppDataSource } from "../../src/config/config";
import { Ingredient } from "../../src/models/ingredient.entity";
import { Recipe } from "../../src/models/recipe.entity";

let connection: any;

describe("Recipes Endpoints", () => {
  beforeAll(async () => {
    // set up test db
    AppDataSource.setOptions({
      database: "chinese_menu_test",
      entities: [Recipe, Ingredient],
      synchronize: true,
      dropSchema: true,
    });
    connection = await AppDataSource.initialize();
    await connection.synchronize(true);

    // create some ingredients
    const ingredient1 = await Ingredient.create({ name: "kale" });
    const ingredient2 = await Ingredient.create({ name: "apple" });
    await AppDataSource.getRepository(Ingredient).save(ingredient1);
    await AppDataSource.getRepository(Ingredient).save(ingredient2);

    // create some recipes
    const recipe1 = await Recipe.create({
      title: "Recipe 1",
      description: "This recipe is blahblahblah....",
      instructions: "Step 1: ....., Step 2: ......",
    });
    const recipe2 = await Recipe.create({
      title: "Recipe 2",
      description: "This recipe is blahblahblah....",
      instructions: "Step 1: ....., Step 2: ......",
    });
    await AppDataSource.getRepository(Recipe).save(recipe1);
    await AppDataSource.getRepository(Recipe).save(recipe2);

    // Add ingredients to recipes
    recipe1.ingredients = [ingredient1, ingredient2];
    recipe2.ingredients = [ingredient1, ingredient2];

    await AppDataSource.getRepository(Recipe).save(recipe1);
    await AppDataSource.getRepository(Recipe).save(recipe2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("GET '/recipes', Gets all recipes", (done) => {
    const response = request(app)
      .get("/recipes")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toMatchObject([
          {
            id: 1,
            title: "Recipe 1",
            description: "This recipe is blahblahblah....",
            instructions: "Step 1: ....., Step 2: ......",
          },
          {
            id: 2,
            title: "Recipe 2",
            description: "This recipe is blahblahblah....",
            instructions: "Step 1: ....., Step 2: ......",
          },
        ]);

        done();
      });
  });

  it("POST '/recipes/', creates an recipe", (done) => {
    const response = request(app)
      .post("/recipes")
      .send({
        title: "Recipe 3",
        description: "This recipe is blahblahblah....",
        instructions: "Step 1: ....., Step 2: ......",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toMatchObject({
          message: "Recipe id: 3 created successfully",
          result: {
            id: 3,
            title: "Recipe 3",
            description: "This recipe is blahblahblah....",
            instructions: "Step 1: ....., Step 2: ......",
          },
        });
        done();
      });
  });

  it("GET '/recipes/:id', Get an recipe by id", (done) => {
    const response = request(app)
      .get("/recipes/1")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toMatchObject([
          {
            id: 1,
            title: "Recipe 1",
            description: "This recipe is blahblahblah....",
            instructions: "Step 1: ....., Step 2: ......",
          },
        ]);

        done();
      });
  });

  it("PUT '/recipes/:id', updates an recipe", (done) => {
    const response = request(app)
      .put("/recipes/1")
      .send({
        title: "New Recipe Name",
      })
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const updated = await Recipe.findOneBy({ id: 1 });
        expect(updated).toMatchObject({
          id: 1,
          title: "New Recipe Name",
          description: "This recipe is blahblahblah....",
          instructions: "Step 1: ....., Step 2: ......",
        });

        done();
      });
  });

  it("GET '/recipes/:id/ingredients' it will return recipe's list of ingredients", (done) => {
    const response = request(app)
      .get("/recipes/2/ingredients")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toMatchObject([
          { id: 1, name: "kale" },
          { id: 2, name: "apple" },
        ]);

        done();
      });
  });

  it("DELETE '/recipes/:id', deletes an recipe by id", (done) => {
    const response = request(app)
      .delete("/recipes/1")
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const deleted = await Recipe.findOneBy({ id: 1 });
        const ingredientIsNotDeleted = await Ingredient.findBy({
          name: "kale",
        });

        expect(deleted).toBe(null);
        expect(ingredientIsNotDeleted).toMatchObject([{ id: 1, name: "kale" }]);

        done();
      });
  });
});
