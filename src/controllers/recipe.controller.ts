import express, { Request, Response } from "express";
import { AppDataSource } from "../config/config";
import { Recipe } from "../models/recipe.entity";

const app = express();
app.use(express.json());

export const findAllRecipes = async (_req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err: any) {
    res.status(500).send({
      message:
        err.message || "Something went wrong while retrieving recipes",
    });
  }
};

export const findRecipe = async (req: Request, res: Response) => {
  try {
    const result = await Recipe.findBy({ id: +req.params.id });
    return res.send(result);
  } catch (err: any) {
    res.status(500).send({
      message:
        err.message || `Something went wrong while retrieving recipe`,
    });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.create(req.body);
    const result = await AppDataSource.getRepository(Recipe).save(
      recipe
    );
    return res.status(200).send({
      message: `Recipe id: ${result.id} created successfully`,
      result,
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Something went wrong while creating recipe",
    });
  }
};

export const updateRecipe = async function (req: Request, res: Response) {
  try {
    const recipe = await Recipe.findBy({ id: +req.params.id });
    await Recipe.update(recipe[0].id, req.body);
    const updated = await Recipe.findBy({ id: +req.params.id });
    return res.send(updated);
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Something went wrong while updating recipe",
    });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const results = await AppDataSource.getRepository(Recipe).delete(
      req.params.id
    );
    return res.send({message: "Successfully deleted recipe", results });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Something went wrong while deleting recipe",
    });
  }
};

export default app;
