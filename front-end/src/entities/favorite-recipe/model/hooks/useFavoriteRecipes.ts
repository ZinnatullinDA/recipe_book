import { useEffect } from 'react'
import { useFavoriteRecipeStore } from '../favoriteRecipe.store'

export function useFavoriteRecipes() {
  const recipes = useFavoriteRecipeStore(state => state.recipes)
  const isLoading = useFavoriteRecipeStore(state => state.isLoading)
  const error = useFavoriteRecipeStore(state => state.error)
  const loadRecipes = useFavoriteRecipeStore(state => state.loadRecipes)
  const addRecipe = useFavoriteRecipeStore(state => state.addRecipe)
  const removeRecipe = useFavoriteRecipeStore(state => state.removeRecipe)

  useEffect(() => {
    void loadRecipes()
  }, [loadRecipes])

  return {
    recipes,
    isLoading,
    error,
    addRecipe,
    removeRecipe,
  }
}
