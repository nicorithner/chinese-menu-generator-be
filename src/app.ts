import express, { Request, Response } from 'express';
const app = express();
app.use(express.json())
import { AppDataSource } from "./config/config";
import { User } from "./models/user.entity"


//routes 
const userRoutes = require("./routes/user.routes");
userRoutes(app)


export default app;
