import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

app.listen(port, (): void => console.log(`running on port ${port}`));
