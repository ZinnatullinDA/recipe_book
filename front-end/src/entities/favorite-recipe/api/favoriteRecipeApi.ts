import type { RecipeDetailsModel } from '@/entities/recipe'
import type { FavoriteRecipe } from '../model/types'
import { backendRequest } from '@/shared/api/backendRequest'

export const favoriteRecipeApi = {
  getFavorites: () => backendRequest<FavoriteRecipe[]>({
    url: '/favorites',
  }),

  getFavoriteById: (id: string) => backendRequest<FavoriteRecipe>({
    url: `/favorites/${id}`,
  }),

  addFavorite: (recipe: RecipeDetailsModel) => backendRequest<FavoriteRecipe>({
    url: '/favorites',
    method: 'POST',
    data: recipe,
  }),

  removeFavorite: (id: string) => backendRequest<void>({
    url: `/favorites/${id}`,
    method: 'DELETE',
  }),
}
