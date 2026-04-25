import type { RecipeDetails } from '../types'
import { create } from 'zustand'
import { recipeApi } from '../../api/recipeApi'
import { mapRecipeDetails } from '../../lib/mapRecipe'

interface RandomRecipeState {
  recipe: RecipeDetails | null
  isLoading: boolean
  error: string | null
  fetchRandomRecipe: () => Promise<void>
}

const useRandomRecipeStore = create<RandomRecipeState>(set => ({
  recipe: null,
  isLoading: false,
  error: null,

  fetchRandomRecipe: async () => {
    try {
      set({ isLoading: true, error: null })
      const data = await recipeApi.getRandomRecipe()
      set({ recipe: mapRecipeDetails(data.recipes[0]) })
    }
    catch {
      set({ error: 'Не удалось получить случайный рецепт.' })
    }
    finally {
      set({ isLoading: false })
    }
  },
}))

export function useRandomRecipe() {
  return useRandomRecipeStore()
}
