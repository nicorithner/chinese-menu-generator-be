import "reflect-metadata";
import { DataSource } from "typeorm";
import { Ingredient } from "../models/ingredient.entity";
import { User } from "../models/user.entity";
import { Menu } from "../models/menu.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "chinese_menu_dev",
  synchronize: true,
  logging: true,
  entities: [Ingredient, User, Menu],
  migrations: [],
  subscribers: [],
});
