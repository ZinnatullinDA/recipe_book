import type { RecipeDetailsModel } from '@/entities/recipe'

export interface AiRecipe extends RecipeDetailsModel {
  id: string
  sourceType: 'ai'
  sourceId: string
  sourceKey: string
}
