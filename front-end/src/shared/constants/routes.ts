export const ROUTES = {
  home: '/',
  recipes: '/recipes',
  recipeDetails: '/recipes/:recipeId',
  randomRecipe: '/random-recipe',
  myRecipes: '/my-recipes',
  myRecipeDetails: '/my-recipes/:id',
  myRecipeCreate: '/my-recipes/create',
  myRecipeEdit: '/my-recipes/:id/edit',
  favorites: '/favorites',
  favoriteRecipeDetails: '/favorites/:id',
  aiRecipes: '/ai-recipes',
  aiRecipeDetails: '/ai-recipes/:id',
} as const
