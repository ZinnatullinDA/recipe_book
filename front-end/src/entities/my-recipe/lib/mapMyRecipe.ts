import type { RecipeDetailsModel } from '@/entities/recipe'
import type { MyRecipe } from '../model/types'

export function mapMyRecipeToRecipeDetails(recipe: MyRecipe): RecipeDetailsModel {
  return {
    id: recipe.id,
    title: recipe.title,
    imageUrl: recipe.imageUrl,
    readyInMinutes: recipe.cookingTime,
    servings: recipe.servings,
    summary: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    dishTypes: recipe.category ? [recipe.category] : [],
    diets: [],
    cuisines: [],
    sourceType: 'my',
    sourceId: recipe.id,
    sourceKey: recipe.id,
  }
}
