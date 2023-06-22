import express, { Request, Response } from "express";
import { AppDataSource } from "../config/config";
import { Recipe } from "../models/recipe.entity";

const app = express();
app.use(express.json());

export const findAllRecipes = async (_req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    if (!recipes) throw new Error("No recipes found");
    res.json(recipes);
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Something went wrong while retrieving recipes",
    });
  }
};

export const findRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findOne({ where: { id: +req.params.id } });
    if (!recipe) throw new Error("No Recipe found");
    res.send(recipe);
  } catch (err: any) {
    res.status(500).send({
      message: err.message || `Something went wrong while retrieving recipe`,
    });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.create(req.body);
    const savedRecipe = await AppDataSource.getRepository(Recipe).save(recipe);
    res.status(200).send({
      message: `Recipe id: ${savedRecipe.id} created successfully`,
      savedRecipe,
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
    if (!recipe) throw new Error(`No recipe found with id ${req.params.id}`);

    await Recipe.update(recipe[0].id, req.body);
    const updated = await Recipe.findBy({ id: +req.params.id });
    res.send(updated);
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
    res.send({ message: "Successfully deleted recipe", results });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Something went wrong while deleting recipe",
    });
  }
};

export const findRecipeIngredients = async (req: Request, res: Response) => {
  try {
    const recipe = await AppDataSource.getRepository(Recipe).findOne({
      relations: {
        ingredients: true,
      },
      where: { id: +req.params.id },
    });

    if (recipe?.ingredients) {
      res.send(recipe?.ingredients);
    } else if (!recipe) {
      throw new Error("Recipe not found");
    } else {
      res.status(204).send({
        message: `Recipe ${recipe?.title} has no ingredients`,
      });
    }
  } catch (err: any) {
    res.status(500).send({
      message:
        err.message ||
        `Something went wrong while retrieving list of ingredients`,
    });
  }
};

export default app;
