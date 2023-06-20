import express, { Request, Response } from "express";
import { AppDataSource } from "../config/config";
import { Menu } from "../models/menu.entity"

const app = express();
app.use(express.json());

export const findAllMenus = async (req: Request, res: Response) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (err: any) {
        res.status(500).send({
            message:
                err.message || "Something went wrong while retrieving menus",
        });
    }
};

export const findMenuById = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.findBy({ id: +req.params.id });
        return res.send(menu);
    } catch (err: any) {
        res.status(500).send({
            message:
                err.message || "Something went wrong while retrieving a menu",
        });
    }
}

export const createMenu = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.create(req.body);
        const results = await AppDataSource.getRepository(Menu).save(menu);
        return res.status(200).send({
            message: `Menu id: ${menu.id} created successfully`, menu
        });
    } catch (err: any) {
        res.status(500).send({
            message: err.message ||
                "Something went wrong while creating menu",
        });
    }
}

export const updateMenu = async (req: Request, res: Response) => {
    try {
        const menuToUpdate = await Menu.findBy({ id: +req.params.id });
        await Menu.update(menuToUpdate[0].id, req.body);
        const menuUpdated = await Menu.findBy({ id: +req.params.id })
        return res.send(menuUpdated);
    } catch (err: any) {
        res.status(500).send({
            message: err.message ||
                "Something went wrong while updating menu",
        });
    }
}

export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const results = await AppDataSource.getRepository(Menu).delete(req.params.id);
        return res.send({ message: "Successfully deleted menu", results });
    } catch (err: any) {
        res.status(500).send({
            message: err.message ||
                "Something went wrong while deleting menu",
        });
    }
};



export default app;