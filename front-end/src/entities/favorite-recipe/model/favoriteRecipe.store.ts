import type { FavoriteRecipe } from './types'
import type { RecipeDetailsModel } from '@/entities/recipe'
import { create } from 'zustand'
import { favoriteRecipeApi } from '../api/favoriteRecipeApi'

interface FavoriteRecipeState {
  recipes: FavoriteRecipe[]
  isLoading: boolean
  error: string | null
  loadRecipes: () => Promise<void>
  addRecipe: (recipe: RecipeDetailsModel) => Promise<FavoriteRecipe | null>
  removeRecipe: (id: string) => Promise<void>
}

export const useFavoriteRecipeStore = create<FavoriteRecipeState>(set => ({
  recipes: [],
  isLoading: false,
  error: null,

  loadRecipes: async () => {
    try {
      set({ isLoading: true, error: null })
      const recipes = await favoriteRecipeApi.getFavorites()
      set({ recipes })
    }
    catch {
      set({ error: 'Не удалось загрузить избранные рецепты.' })
    }
    finally {
      set({ isLoading: false })
    }
  },

  addRecipe: async (recipe) => {
    try {
      const createdRecipe = await favoriteRecipeApi.addFavorite(recipe)
      set((state) => {
        const existingRecipe = state.recipes.find(item => item.sourceKey === createdRecipe.sourceKey)

        return {
          recipes: existingRecipe
            ? state.recipes.map(item => item.sourceKey === createdRecipe.sourceKey ? createdRecipe : item)
            : [createdRecipe, ...state.recipes],
          error: null,
        }
      })
      return createdRecipe
    }
    catch {
      set({ error: 'Не удалось добавить рецепт в избранное.' })
      return null
    }
  },

  removeRecipe: async (id) => {
    try {
      await favoriteRecipeApi.removeFavorite(id)
      set(state => ({
        recipes: state.recipes.filter(recipe => recipe.id !== id),
        error: null,
      }))
    }
    catch {
      set({ error: 'Не удалось убрать рецепт из избранного.' })
    }
  },
}))
