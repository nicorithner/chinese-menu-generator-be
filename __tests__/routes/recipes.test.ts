import request from "supertest";
import app from "../../src/app";
import "reflect-metadata";
import { AppDataSource } from "../../src/config/config";
import { Recipe } from "../../src/models/recipe.entity";

let connection: any;

describe("Recipes Endpoints", () => {
  beforeAll(async () => {
    // set up test db
    AppDataSource.setOptions({
      database: "chinese_menu_test",
      entities: [Recipe],
      synchronize: true,
      dropSchema: true,
    });
    connection = await AppDataSource.initialize();
    await connection.synchronize(true);

    const recipe1 = await Recipe.create({
      category: "main course",
      title: "Recipe 1",
      summary: "This recipe is blahblahblah....",
      steps: "Step 1: ....., Step 2: ......",
      ingredients: "oil, garlic, ...",
    });
    const recipe2 = await Recipe.create({
      category: "dessert",
      title: "Recipe 2",
      summary: "This recipe is blahblahblah....",
      steps: "Step 1: ....., Step 2: ......",
      ingredients: "flour, butter, ...",
    });
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
            category: "main course",
            title: "Recipe 1",
            summary: "This recipe is blahblahblah....",
            steps: "Step 1: ....., Step 2: ......",
            ingredients: "oil, garlic, ..."
          },
          {
            id: 2,
            title: "Recipe 2",
            category: "dessert",
            summary: "This recipe is blahblahblah....",
            steps: "Step 1: ....., Step 2: ......",
            ingredients: "flour, butter, ...",
          },
        ]);

        done();
      });
  });

  it("POST '/recipes/', creates an recipe", (done) => {
    const response = request(app)
      .post("/recipes")
      .send({
        category: "soup",
        title: "Recipe 3",
        summary: "This recipe is blahblahblah....",
        steps: "Step 1: ....., Step 2: ......",
        ingredients: "water, chicken, ...",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toMatchObject({
          message: "Recipe id: 3 created successfully",
          savedRecipe: {
            id: 3,
            category: "soup",
            title: "Recipe 3",
            summary: "This recipe is blahblahblah....",
            steps: "Step 1: ....., Step 2: ......",
            ingredients: "water, chicken, ...",
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

        expect(res.body).toMatchObject(
          {
            id: 1,
            category: "main course",
            title: "Recipe 1",
            summary: "This recipe is blahblahblah....",
            steps: "Step 1: ....., Step 2: ......",
            ingredients: "oil, garlic, ..."
          },
        );

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
          category: "main course",
          title: "New Recipe Name",
          summary: "This recipe is blahblahblah....",
          steps: "Step 1: ....., Step 2: ......",
          ingredients: "oil, garlic, ..."
        });

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
        expect(deleted).toBe(null);
        done();
      });
  });
});
