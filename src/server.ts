import app from "./app";
import dotenv from "dotenv";
import "reflect-metadata"
dotenv.config();

import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
})

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized successfully.")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


//port
const port = process.env.PORT;

app.listen(port, (): void => console.log(`running on port ${port}`));
