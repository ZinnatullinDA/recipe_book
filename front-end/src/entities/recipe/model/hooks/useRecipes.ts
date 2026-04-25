import { useEffect } from 'react'
import { useRecipeStore } from '../recipe.store'

export function useRecipes(query: string, cuisine: string) {
  const {
    recipes,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    fetchRecipes,
    fetchNextPage,
  } = useRecipeStore()

  useEffect(() => {
    void fetchRecipes(query, cuisine)
  }, [cuisine, fetchRecipes, query])

  return {
    recipes,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    fetchNextPage,
  }
}
