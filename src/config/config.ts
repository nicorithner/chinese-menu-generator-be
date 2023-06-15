import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "chinese_menu_dev",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})
