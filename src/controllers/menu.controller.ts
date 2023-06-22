import express, { Request, Response } from "express";
import { AppDataSource } from "../config/config";
import { Menu } from "../models/menu.entity"

const app = express();
app.use(express.json());

export const findAllMenus = async (req: Request, res: Response) => {
    try {
        const menus = await Menu.find();
        if (menus.length === 0) throw new Error("No menus found!")
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
        const menu = await Menu.findOneBy({ id: +req.params.id });
        if (!menu) throw new Error(`No menu with id of ${+req.params.id} found!`)
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
        const menuToUpdate = await Menu.findOneBy({ id: +req.params.id });
        if (!menuToUpdate) throw new Error(`Menu with id of ${+req.params.id} can not be found!`)
        await Menu.update(menuToUpdate.id, req.body);
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

        const menuToDelete = await AppDataSource.getRepository(Menu).findOneBy({ id: +req.params.id });
        if (!menuToDelete) throw new Error(`Menu with id of ${+req.params.id} can not be found!`)
        const result = await AppDataSource.getRepository(Menu).delete(req.params.id);
        return res.send({ message: "Successfully deleted menu", result });
    } catch (err: any) {
        res.status(500).send({
            message: err.message ||
                "Something went wrong while deleting menu",
        });
    }
};



export default app;