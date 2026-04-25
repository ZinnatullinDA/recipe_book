import type { RecipeDetails } from '../types'
import { useEffect, useState } from 'react'
import { recipeApi } from '../../api/recipeApi'
import { mapRecipeDetails } from '../../lib/mapRecipe'

export function useRecipeDetails(recipeId?: string) {
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!recipeId)
      return

    const loadRecipe = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await recipeApi.getRecipeById(recipeId)
        setRecipe(mapRecipeDetails(data))
      }
      catch {
        setError('Не удалось получить детали рецепта.')
      }
      finally {
        setIsLoading(false)
      }
    }

    void loadRecipe()
  }, [recipeId])

  return {
    recipe,
    isLoading,
    error,
  }
}
