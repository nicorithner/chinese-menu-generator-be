import { AppDataSource } from "../config/config";
import { Recipe } from "../models/recipe.entity";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const recipeService = async (category: string) => {
  const APIKey = process.env.RECIPE_API_KEY;
  const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=chinese&type=${category}&number=1&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&apiKey=${APIKey}`;

  try {
    const response = await axios.get(url);
    const recipe = response.data.results[0];
    const title = recipe.title;
    const summary = recipe.summary.replace(/<[^>]+>/g, "");
    const stepsArray = recipe.analyzedInstructions[0].steps;
    const steps = stepsArray.map((step: { number: number; step: string }) => ({
      number: step.number,
      step: step.step,
    }));

    const stepsString = JSON.stringify(steps);

    const ingredients = recipe.extendedIngredients.map(
      (ingredient: { name: string; amount: number; unit: number }) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })
    );

    const ingredientsString = JSON.stringify(ingredients);
    const recipe1 = Recipe.create({
      title: title,
      category: category,
      summary: summary,
      steps: stepsString,
      ingredients: ingredientsString,
    });

    await AppDataSource.getRepository(Recipe).save(recipe1);
    return recipe1;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};
