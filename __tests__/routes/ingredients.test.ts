import request from "supertest";
import { AppDataSource } from "../../src/config/config";
import { Ingredient } from "../../src/models/ingredient.entity";
import app from "../../src/app";

let connection: any;

describe("Ingredients Endpoints", () => {
  beforeAll(async () => {
    // set up test db
    AppDataSource.setOptions({
      database: "chinese_menu_test",
      entities: [Ingredient],
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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("GET '/ingredients', Gets all ingredients", (done) => {
    const response = request(app)
      .get("/ingredients")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "kale",
          },
          {
            id: 2,
            name: "apple",
          },
        ]);

        done();
      });
  });

  it("POST '/ingredients/', creates an ingredient", (done) => {
    const response = request(app)
      .post("/ingredients")
      .send({
        name: "potato",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toMatchObject({
          id: 3,
          name: "potato",
        });

        done();
      });
  });

  it("GET '/ingredients/:id', Get an ingredient by id", (done) => {
    const response = request(app)
      .get("/ingredients/1")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "kale",
          },
        ]);

        done();
      });
  });

  it("DELETE '/ingredients/:id', deletes an ingredient by id", (done) => {
    const response = request(app)
      .delete("/ingredients/1")
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);

        const deleted = await Ingredient.findOneBy({ id: 1 });
        expect(deleted).toBe(null);

        done();
      });
  });
});
