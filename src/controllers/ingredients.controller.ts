import express, { Request, Response } from "express";
import { AppDataSource } from "../config/config";
import { Ingredient } from "../models/ingredient.entity";

const app = express();
app.use(express.json());

export const findAllIngredients = async (req: Request, res: Response) => {
  const ingredients = await Ingredient.find();
  res.json(ingredients);
};

export const findIngredientById = async (req: Request, res: Response) => {
  const results = await Ingredient.findBy({ id: +req.params.id });
  return res.send(results);
};

export const createIngredient = async (req: Request, res: Response) => {
  const ingredient = await Ingredient.create(req.body);
  const results = await AppDataSource.getRepository(Ingredient).save(
    ingredient
  );
  return res.send(results);
};

// app.patch("/ingredients/:id", async function (req: Request, res: Response) {
//   const ingredient = await Ingredient.findOneBy({ id: req.body.id });

//   Ingredient.merge(ingredient, req.body);
//   const results = await Ingredient.update(ingredient?.id, req.body);

//   return res.send(results);
// });

export const deleteIngredient = async (req: Request, res: Response) => {
  const results = await AppDataSource.getRepository(Ingredient).delete(
    req.params.id
  );
  return res.send(results);
};

export default app;
