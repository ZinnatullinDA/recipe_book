import type { RecipePreview } from './types'
import { create } from 'zustand'
import { recipeApi } from '../api/recipeApi'
import { mapRecipePreview } from '../lib/mapRecipe'

interface RecipeStore {
  recipes: RecipePreview[]
  isLoading: boolean
  isLoadingMore: boolean
  error: string | null
  query: string
  cuisine: string
  offset: number
  total: number
  hasMore: boolean
  fetchRecipes: (query?: string, cuisine?: string) => Promise<void>
  fetchNextPage: () => Promise<void>
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  isLoading: false,
  isLoadingMore: false,
  error: null,
  query: '',
  cuisine: '',
  offset: 0,
  total: 0,
  hasMore: true,

  fetchRecipes: async (query = '', cuisine = '') => {
    try {
      set({
        isLoading: true,
        error: null,
        query,
        cuisine,
        offset: 0,
        total: 0,
        hasMore: true,
      })

      const data = await recipeApi.getRecipes(query, cuisine, 0, 20)
      const recipes = data.results.map(mapRecipePreview)

      set({
        recipes,
        total: data.totalResults,
        offset: recipes.length,
        hasMore: recipes.length < data.totalResults,
      })
    }
    catch {
      set({ error: 'Не удалось загрузить рецепты. Проверьте API-ключ и повторите попытку.' })
    }
    finally {
      set({ isLoading: false })
    }
  },

  fetchNextPage: async () => {
    const {
      isLoading,
      isLoadingMore,
      hasMore,
      query,
      cuisine,
      offset,
      recipes,
    } = get()

    if (isLoading || isLoadingMore || !hasMore)
      return

    try {
      set({ isLoadingMore: true, error: null })
      const data = await recipeApi.getRecipes(query, cuisine, offset, 20)
      const nextRecipes = data.results.map(mapRecipePreview)

      set({
        recipes: [...recipes, ...nextRecipes],
        total: data.totalResults,
        offset: offset + nextRecipes.length,
        hasMore: offset + nextRecipes.length < data.totalResults,
      })
    }
    catch {
      set({ error: 'Не удалось загрузить следующую страницу рецептов.' })
    }
    finally {
      set({ isLoadingMore: false })
    }
  },
}))
