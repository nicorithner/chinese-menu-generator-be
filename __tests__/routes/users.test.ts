import request from "supertest";
import { AppDataSource } from "../../src/config/config";
import { User } from "../../src/models/user.entity";
import app from "../../src/app";
import { Menu } from "../../src/models/menu.entity";

let connection: any;

describe("Users Endpoints", () => {
    beforeAll(async () => {
        //set up the test db
        AppDataSource.setOptions({
            database: "chinese_menu_test",
            entities: [User, Menu],
            synchronize: true,
            dropSchema: true,
        })
        connection = await AppDataSource.initialize();
        await connection.synchronize(true);


        //create some users 
        const user1 = await User.create({ firstName: "Lily", lastName: "G" });
        const user2 = await User.create({ firstName: "Lucy", lastName: "T" });
        await AppDataSource.getRepository(User).save(user1);
        await AppDataSource.getRepository(User).save(user2);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it("GET '/users', get all users", (done) => {
        const response = request(app)
            .get("/users")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject([
                    {
                        id: 1,
                        firstName: "Lily",
                        lastName: "G",
                    },
                    {
                        id: 2,
                        firstName: "Lucy",
                        lastName: "T"
                    },
                ]);
                done();
            });
    });

    it("POST '/users/', create an user", (done) => {
        const response = request(app)
            .post("/users")
            .send({
                firstName: "Tina",
                lastName: "S",
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({
                    message: "User id: 3 created successfully",
                    result: {
                        id: 3,
                        firstName: "Tina",
                        lastName: "S",
                    }
                });
                done();
            });
    });
    it("GET '/user/:id', get a user by id", (done) => {
        const response = request(app)
            .get("/users/1")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject([
                    {
                        firstName: "Lily",
                        lastName: "G"
                    },
                ]);
                done();
            });
    });

    it("PUT '/users/:id', update a user", (done) => {
        const response = request(app)
            .put("/users/1")
            .send({
                firstName: "Tom",
                lastName: "W",
            })
            .expect(200)
            .end(async (err, res) => {
                const updated = await User.findOneBy({ id: 1 });
                expect(updated).toMatchObject({
                    id: 1,
                    firstName: "Tom",
                    lastName: "W",
                });
                done();
            });
    });

    it("DELETE '/users/:id', delete a user by id", (done) => {
        const response = request(app)
            .delete("/users/1")
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err);
                const deletedMenu = await Menu.findOneBy({ user_id: 1 });
                expect(deletedMenu).toBe(null);
                const deletedUser = await User.findOneBy({ id: 1 });
                expect(deletedUser).toBe(null);
                done();
            });
    });
});