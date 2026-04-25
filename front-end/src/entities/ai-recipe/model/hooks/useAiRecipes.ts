import type { AiRecipe } from '../types'
import { useState } from 'react'
import { aiRecipeApi } from '../../api/aiRecipeApi'

export function useAiRecipes() {
  const [recipes, setRecipes] = useState<AiRecipe[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateRecipes = async (prompt: string) => {
    try {
      setIsGenerating(true)
      setError(null)
      const data = await aiRecipeApi.generateRecipes(prompt)
      setRecipes(data)
    }
    catch {
      setError('Не удалось сгенерировать AI-рецепты.')
      setRecipes([])
    }
    finally {
      setIsGenerating(false)
    }
  }

  return {
    recipes,
    isLoading: false,
    isGenerating,
    error,
    generateRecipes,
  }
}
