import type { AiRecipe } from '../model/types'
import { backendRequest } from '@/shared/api/backendRequest'

export const aiRecipeApi = {
  getRecipes: () => backendRequest<AiRecipe[]>({
    url: '/ai-recipes',
  }),

  getRecipeById: (id: string) => backendRequest<AiRecipe>({
    url: `/ai-recipes/${id}`,
  }),

  generateRecipes: (prompt: string) => backendRequest<AiRecipe[]>({
    url: '/ai-recipes/generate',
    method: 'POST',
    data: { prompt },
  }),
}
