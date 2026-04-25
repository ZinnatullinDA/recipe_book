import { useEffect } from 'react'
import { useMyRecipeStore } from '../myRecipe.store'

export function useMyRecipes() {
  const recipes = useMyRecipeStore(state => state.recipes)
  const isLoading = useMyRecipeStore(state => state.isLoading)
  const error = useMyRecipeStore(state => state.error)
  const loadRecipes = useMyRecipeStore(state => state.loadRecipes)
  const createRecipe = useMyRecipeStore(state => state.createRecipe)
  const importRecipe = useMyRecipeStore(state => state.importRecipe)
  const updateRecipe = useMyRecipeStore(state => state.updateRecipe)
  const deleteRecipe = useMyRecipeStore(state => state.deleteRecipe)

  useEffect(() => {
    void loadRecipes()
  }, [loadRecipes])

  return {
    recipes,
    isLoading,
    error,
    createRecipe,
    importRecipe,
    updateRecipe,
    deleteRecipe,
  }
}
