import request from "supertest";
import { AppDataSource } from "../../src/config/config";
import app from "../../src/app"
import { Menu } from "../../src/models/menu.entity"
import { User } from "../../src/models/user.entity";

let connection: any;

describe("Menus Endpoints", () => {
    beforeAll(async () => {
        //set up the test db 
        AppDataSource.setOptions({
            database: "chinese_menu_test",
            entities: [Menu, User],
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

        //create some menus
        const menu1 = await Menu.create({
            name: "Cucumber Salad",
            user_id: user1.id,
        });
        const menu2 = await Menu.create({
            name: "Spicy Cold Noodles",
            user_id: user2.id,
        });

        await AppDataSource.getRepository(Menu).save(menu1);
        await AppDataSource.getRepository(Menu).save(menu2);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it("GET '/menus', get all menus", (done) => {
        const response = request(app)
            .get("/menus")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject([
                    {
                        id: 1,
                        name: "Cucumber Salad",
                        user_id: 1,
                    },
                    {
                        id: 2,
                        name: "Spicy Cold Noodles",
                        user_id: 2,
                    },
                ]),
                    done();
            });
    });

    it("POST '/menus', create a menu", (done) => {
        const response = request(app)
            .post("/menus")
            .send({
                name: "Mini Spicy Hotpot",
                user_id: 1,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({
                    message: "Menu id: 3 created successfully"
                });
                done();
            });
    });

    it("GET '/menus/:id', get a menu by id", (done) => {
        const response = request(app)
            .get("/menus/1")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject(
                    {
                        id: 1,
                        name: "Cucumber Salad",
                        user_id: 1,
                    }
                );
                done();
            });
    });

    it("PUT'/menus/:id', update a menu by id", (done) => {
        const response = request(app)
            .put("/menus/1")
            .send({
                name: "Chicken with Vegetable",
            })
            .expect(200)
            .end(async (err, res) => {
                const updated = await Menu.findOneBy({ id: 1 });
                expect(updated).toMatchObject({
                    id: 1,
                    name: "Chicken with Vegetable",
                    user_id: 1,
                });
                done();
            });
    });

    it("DELETE '/menus/:id', delte a menu by id", (done) => {
        const response = request(app)
            .delete("/menus/1")
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err);
                const deleted = await Menu.findOneBy({ id: 1 });
                expect(deleted).toBe(null);
                done();
            });
    });
})