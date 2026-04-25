import type { RecipeDetailsModel } from '@/entities/recipe'

export interface FavoriteRecipe extends RecipeDetailsModel {
  id: string
  sourceType: string
  sourceId: string
  sourceKey: string
}
