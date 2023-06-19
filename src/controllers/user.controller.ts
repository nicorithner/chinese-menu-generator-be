import express, { Request, Response } from 'express';
import { AppDataSource } from "../config/config";
import { User } from "../models/user.entity"
import { Menu } from '../models/menu.entity';

const app = express();
app.use(express.json())

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

export const updateUser = async function (req: Request, res: Response) {
    const user = await User.findBy({ id: +req.params.id });
    await User.update(user[0].id, req.body);
    const updated = await User.findBy({ id: +req.params.id });

    return res.send(updated);
};

export const deleteUser = async function (req: Request, res: Response) {

    await AppDataSource.getRepository(Menu).delete({ user_id: +req.params.id });
    const results = await AppDataSource.getRepository(User).delete(
        req.params.id
    );
    return res.send(results);
};