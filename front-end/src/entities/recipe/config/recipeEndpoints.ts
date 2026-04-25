export const recipeEndpoints = {
  recipesList: '/recipes/complexSearch',
  recipeDetails: (id: number | string) => `/recipes/${id}/information`,
  randomRecipe: '/recipes/random',
} as const
