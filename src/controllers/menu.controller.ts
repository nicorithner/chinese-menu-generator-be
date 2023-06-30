import express, { Request, Response } from "express";
import { AppDataSource } from "../config/config";
import { Menu } from "../models/menu.entity";
import { recipeService } from "../services/recipe.service";

const app = express();
app.use(express.json());

const getRecipes = async (categories) => {
    const menuRecipes = Array();
    for (const category of categories) {
        const recipe = await recipeService(category);
        menuRecipes.push(recipe);
    }
    return menuRecipes;
};

export const findAllMenus = async (req: Request, res: Response) => {
    try {
        const menus = await Menu.find({
            relations: {
                recipes: true,
            },
        });
        if (menus.length === 0) throw new Error("No menus found!");
        res.json(menus);
    } catch (err: any) {
        res.status(500).send({
            message: err.message || "Something went wrong while retrieving menus",
        });
    }
};

export const findMenuById = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.findOne({
            where: { id: +req.params.id },
            relations: { recipes: true },
        });
        if (!menu) throw new Error(`No menu with id of ${+req.params.id} found!`);
        return res.send(menu);
    } catch (err: any) {
        res.status(500).send({
            message: err.message || "Something went wrong while retrieving a menu",
        });
    }
};

export const createMenu = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.create(req.body);
        await AppDataSource.getRepository(Menu).save(menu);
        const { categories } = req.body;
        const menuRecipes = Array();
        for (const category of categories) {
            const recipe = await recipeService(category);
            menuRecipes.push(recipe);
        }
        menu.recipes = menuRecipes;
        await AppDataSource.getRepository(Menu).save(menu);
        return res.status(200).send({
            message: `Menu id: ${menu.id} created successfully`,
            menu,
        });
    } catch (err: any) {
        res.status(500).send({
            message: err.message || "Something went wrong while creating menu",
        });
    }
};

export const updateMenu = async (req: Request, res: Response) => {
    try {
        const menuToUpdate = await await Menu.findOne({
            where: { id: +req.params.id },
            relations: { recipes: true },
        });
        const { name, categories } = req.body;
        if (!menuToUpdate)
            throw new Error(`Menu with id of ${+req.params.id} can not be found!`);
        menuToUpdate.name = name;
        const menuRecipes = Array();
        for (const category of categories) {
            const recipe = await recipeService(category);
            menuRecipes.push(recipe);
        }
        menuToUpdate.recipes = menuRecipes;
        await AppDataSource.getRepository(Menu).save(menuToUpdate);
        const menuUpdated = await Menu.findOne({
            where: { id: +req.params.id },
            relations: { recipes: true },
        });
        return res.send(menuUpdated);
    } catch (err: any) {
        res.status(500).send({
            message: err.message || "Something went wrong while updating menu",
        });
    }
};

export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const menuToDelete = await Menu.findOne({
            where: { id: +req.params.id },
            relations: { recipes: true },
        });
        if (!menuToDelete)
            throw new Error(`Menu with id of ${+req.params.id} can not be found!`);
        const result = await AppDataSource.getRepository(Menu).delete(
            req.params.id
        );
        return res.send({ message: "Successfully deleted menu", result });
    } catch (err: any) {
        res.status(500).send({
            message: err.message || "Something went wrong while deleting menu",
        });
    }
};

export const deleteMenuRecipe = async (req: Request, res: Response) => {
    try {
        const menuToDelete = await Menu.findOne({
            where: { id: +req.params.id },
            relations: { recipes: true },
        });

        if (!menuToDelete) {
            throw new Error(`Menu with id of ${+req.params.id} cannot be found!`);
        }

        const recipeIdToDelete = +req.params.recipeId;
        menuToDelete.recipes = menuToDelete.recipes.filter(
            (recipe) => recipe.id !== recipeIdToDelete
        );

        await AppDataSource.getRepository(Menu).save(menuToDelete);

        return res.send({
            message: `Menu recipe with id ${recipeIdToDelete} deleted successfully`,
        });
    } catch (err: any) {
        res.status(500).send({
            message:
                err.message || "Something went wrong while deleting the menu recipe",
        });
    }
};

export default app;
