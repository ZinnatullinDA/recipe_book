import type { MyRecipe, MyRecipeFormValues } from '../model/types'
import type { RecipeDetails } from '@/entities/recipe/model/types'
import { backendRequest } from '@/shared/api/backendRequest'

export const myRecipeApi = {
  getMyRecipes: async () => backendRequest<MyRecipe[]>({
    url: '/my-recipes',
  }),

  getMyRecipeById: async (id: string) => backendRequest<MyRecipe>({
    url: `/my-recipes/${id}`,
  }),

  createMyRecipe: async (data: MyRecipeFormValues) => backendRequest<MyRecipe>({
    url: '/my-recipes',
    method: 'POST',
    data,
  }),

  updateMyRecipe: async (id: string, data: MyRecipeFormValues) => backendRequest<MyRecipe>({
    url: `/my-recipes/${id}`,
    method: 'PUT',
    data,
  }),

  deleteMyRecipe: async (id: string) => backendRequest<void>({
    url: `/my-recipes/${id}`,
    method: 'DELETE',
  }),

  importRecipe: async (recipe: RecipeDetails) => backendRequest<MyRecipe>({
    url: '/my-recipes/import',
    method: 'POST',
    data: recipe,
  }),
}
