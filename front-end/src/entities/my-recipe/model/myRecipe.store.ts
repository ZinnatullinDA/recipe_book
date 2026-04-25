import type { MyRecipe, MyRecipeFormValues } from './types'
import type { RecipeDetails } from '@/entities/recipe/model/types'
import { create } from 'zustand'
import { myRecipeApi } from '../api/myRecipeApi'

interface MyRecipeState {
  recipes: MyRecipe[]
  isLoading: boolean
  error: string | null
  loadRecipes: () => Promise<void>
  createRecipe: (data: MyRecipeFormValues) => Promise<MyRecipe | null>
  importRecipe: (recipe: RecipeDetails) => Promise<MyRecipe | null>
  updateRecipe: (id: string, data: MyRecipeFormValues) => Promise<MyRecipe | null>
  deleteRecipe: (id: string) => Promise<boolean>
}

export const useMyRecipeStore = create<MyRecipeState>(set => ({
  recipes: [],
  isLoading: false,
  error: null,

  loadRecipes: async () => {
    try {
      set({ isLoading: true, error: null })
      const recipes = await myRecipeApi.getMyRecipes()
      set({ recipes })
    }
    catch {
      set({ error: 'Не удалось загрузить ваши рецепты.' })
    }
    finally {
      set({ isLoading: false })
    }
  },

  createRecipe: async (data) => {
    try {
      const recipe = await myRecipeApi.createMyRecipe(data)
      set(state => ({ recipes: [...state.recipes, recipe] }))
      return recipe
    }
    catch {
      set({ error: 'Не удалось создать рецепт.' })
      return null
    }
  },

  importRecipe: async (recipe) => {
    try {
      const createdRecipe = await myRecipeApi.importRecipe(recipe)
      set(state => ({ recipes: [createdRecipe, ...state.recipes] }))
      return createdRecipe
    }
    catch {
      set({ error: 'Не удалось сохранить AI-рецепт.' })
      return null
    }
  },

  updateRecipe: async (id, data) => {
    try {
      const recipe = await myRecipeApi.updateMyRecipe(id, data)
      set(state => ({
        recipes: state.recipes.map(item => item.id === id ? recipe : item),
      }))
      return recipe
    }
    catch {
      set({ error: 'Не удалось обновить рецепт.' })
      return null
    }
  },

  deleteRecipe: async (id) => {
    try {
      await myRecipeApi.deleteMyRecipe(id)
      set(state => ({
        recipes: state.recipes.filter(recipe => recipe.id !== id),
      }))
      return true
    }
    catch {
      set({ error: 'Не удалось удалить рецепт.' })
      return false
    }
  },
}))
