import request from "supertest";
import { Express } from "express-serve-static-core";
import app from "../../src/app";

let server: Express;

describe("Ingredients Routes", () => {
  beforeAll(() => {
    server = app;
  });

  it("should return 200", (done) => {
    request(server)
      .get("/ingredients")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
