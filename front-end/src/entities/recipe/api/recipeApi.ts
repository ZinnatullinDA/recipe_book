import type {
  RandomRecipeResponse,
  RecipeDetailsDto,
  RecipesSearchResponse,
} from '../model/types'
import { SPOONACULAR_API_KEY } from '@/shared/api/config'
import { request } from '@/shared/api/request'
import { recipeEndpoints } from '../config/recipeEndpoints'

function withApiKey(params?: Record<string, unknown>) {
  return {
    apiKey: SPOONACULAR_API_KEY,
    ...params,
  }
}

export const recipeApi = {
  getRecipes: (query = '', cuisine = '', offset = 0, number = 20) => {
    return request<RecipesSearchResponse>(recipeEndpoints.recipesList, withApiKey({
      addRecipeInformation: true,
      number,
      offset,
      query,
      cuisine: cuisine || undefined,
    }))
  },

  getRecipeById: (id: number | string) => {
    return request<RecipeDetailsDto>(recipeEndpoints.recipeDetails(id), withApiKey())
  },

  getRandomRecipe: () => {
    return request<RandomRecipeResponse>(recipeEndpoints.randomRecipe, withApiKey({
      number: 1,
    }))
  },
}
