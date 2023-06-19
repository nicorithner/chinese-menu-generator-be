import express, { Request, Response } from "express";
import { AppDataSource } from "../config/config";
import { Ingredient } from "../models/ingredient.entity";

const app = express();
app.use(express.json());

export const findAllIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Something went wrong while retrieving ingredients",
    });
  }
};

export const findIngredientById = async (req: Request, res: Response) => {
  try {
    const result = await Ingredient.findBy({ id: +req.params.id });
    return res.send(result);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || `Something went wrong while retrieving ingredient`,
    });
  }
};

export const createIngredient = async (req: Request, res: Response) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    const result = await AppDataSource.getRepository(Ingredient).save(
      ingredient
    );
    return res.status(200).send({
      message: `Ingredient id: ${result.id} created successfully`,
      result,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Something went wrong while creating ingredient",
    });
  }
};

export const updateIngredient = async function (req: Request, res: Response) {
  try {
    const ingredient = await Ingredient.findBy({ id: +req.params.id });
    await Ingredient.update(ingredient[0].id, req.body);
    const updated = await Ingredient.findBy({ id: +req.params.id });
    return res.send(updated);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Something went wrong while updating ingredient",
    });
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const results = await AppDataSource.getRepository(Ingredient).delete(
      req.params.id
    );
    return res.send({message: "Successfully deleted ingredient", results });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Something went wrong while deleting ingredient",
    });
  }
};

export default app;
