import express, { Request, Response } from "express";
import { AppDataSource } from "../config/config";
import { Menu } from "../models/menu.entity"

const app = express();
app.use(express.json());

export const findAllMenus = async (req: Request, res: Response) => {
    const menus = await Menu.find();
    res.json(menus);
};

export const findMenuById = async (req: Request, res: Response) => {
    const menu = await Menu.findBy({ id: +req.params.id });
    return res.send(menu);
}

export const createMenu = async (req: Request, res: Response) => {
    const menu = await Menu.create(req.body);
    const results = await AppDataSource.getRepository(Menu).save(menu);
    return res.send(results);

}
export const updateMenu = async (req: Request, res: Response) => {
    const menuToUpdate = await Menu.findBy({ id: +req.params.id });
    await Menu.update(menuToUpdate[0].id, req.body);
    const menuUpdated = await Menu.findBy({ id: +req.params.id })
    return res.send(menuUpdated);

}
export const deleteMenu = async (req: Request, res: Response) => {
    const results = await AppDataSource.getRepository(Menu).delete(req.params.id);
    return res.send(results);
}

