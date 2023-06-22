import express, { Request, Response } from 'express';
import { AppDataSource } from "../config/config";
import { User } from "../models/user.entity"
import { Menu } from '../models/menu.entity';

const app = express();
app.use(express.json())

export const findAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        if (users.length === 0) throw new Error("No users found!")
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
        const result = await User.findOneBy({ id: +req.params.id });
        if (!result) throw new Error(`No user with id of ${+req.params.id} are found`)
        res.send(result);
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
        res.status(200).send({
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
        const user = await User.findOneBy({ id: +req.params.id });
        if (!user) throw new Error(`User with id ${+req.params.id} can not be found!`)
        await User.update(user.id, req.body);
        const updated = await User.findBy({ id: +req.params.id });
        res.send(updated);
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
        const userToDelete = await AppDataSource.getRepository(User).findOneBy(
            { id: +req.params.id }
        );
        if (!userToDelete) throw new Error(`User with id ${+req.params.id} can not be found!`)
        const result = await AppDataSource.getRepository(User).delete(
            req.params.id
        );
        res.send({ message: "Successfully deleted user", result });
    } catch (err: any) {
        res.status(500).send({
            message: err.message ||
                "Something went wrong while deleting user",
        });
    }
};

export const findUserMenus = async (req: Request, res: Response) => {
    try {
        const user = await AppDataSource.getRepository(User).findOne({
            relations: {
                menus: true,
            },
            where: { id: +req.params.id }
        });
        if (!user) {
            throw new Error("User not found!")
        } else if (user.menus.length === 0) {
            res.status(204).send({
                message: `User ${user.firstName} ${user.lastName} has no menus.`
            })
        } else {
            res.send(user.menus)
        }
    } catch (err: any) {
        res.status(500).send({
            message:
                err.message || `Something went wrong while retrieving list of menus`
        });
    }
};


export default app;