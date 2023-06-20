import express, { Request, Response } from 'express';
import { AppDataSource } from "../config/config";
import { User } from "../models/user.entity"
import { Menu } from '../models/menu.entity';

const app = express();
app.use(express.json())

export const findAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err: any) {
        res.status(500).send({
            message:
                err.message || "Something went wrong while retrieving users",
        });
    }
};

export const findUserByID = async function (req: Request, res: Response) {
    try {
        const results = await User.findBy({ id: +req.params.id });
        return res.send(results);
    } catch (err: any) {
        res.status(500).send({
            message:
                err.message || "Something went wrong while retrieving a user",
        });
    }
};


export const createUser = async function (req: Request, res: Response) {
    try {
        const user = await User.create(req.body);
        const result = await AppDataSource.getRepository(User).save(user);
        return res.status(200).send({
            message: `User id: ${result.id} created successfully`, result
        });
    } catch (err: any) {
        res.status(500).send({
            message: err.message ||
                "Something went wrong while creating user",
        });
    }
};

export const updateUser = async function (req: Request, res: Response) {
    try {
        const user = await User.findBy({ id: +req.params.id });
        await User.update(user[0].id, req.body);
        const updated = await User.findBy({ id: +req.params.id });

        return res.send(updated);
    } catch (err: any) {
        res.status(500).send({
            message: err.message ||
                "Something went wrong while updating user",
        });
    }
};

export const deleteUser = async function (req: Request, res: Response) {
    try {
        await AppDataSource.getRepository(Menu).delete({ user_id: +req.params.id });
        const results = await AppDataSource.getRepository(User).delete(
            req.params.id
        );
        return res.send({ message: "Successfully deleted user", results });
    } catch (err: any) {
        res.status(500).send({
            message: err.message ||
                "Something went wrong while deleting user",
        });
    }
};

export default app;