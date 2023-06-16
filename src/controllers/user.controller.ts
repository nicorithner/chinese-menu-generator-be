import express, { Request, Response } from 'express';
const app = express();
app.use(express.json())
import { AppDataSource } from "../config/config";
import { User } from "../models/user.entity"

export const findAllUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
};

export const findUser = async function (req: Request, res: Response) {
    const results = await User.findBy({ id: +req.params.id });
    return res.send(results);
};


export const createUser = async function (req: Request, res: Response) {
    const user = await User.create(req.body);
    const results = await AppDataSource.getRepository(User).save(user);
    return res.send(results);
};

// export const updateUser =  async function (req: Request, res: Response) {
//   const user = await User.findOneBy({ id: req.body.id });

//   User.merge(user, req.body);
//   const results = await User.update(User.id, req.body);

//   return res.send(results);
// };

export const deleteUser = async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(User).delete(
        req.params.id
    );
    return res.send(results);
};