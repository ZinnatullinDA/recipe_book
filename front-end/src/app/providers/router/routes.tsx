import { Navigate, Route, Routes } from 'react-router-dom'
import { AiRecipeDetailsPage } from '@/pages/ai-recipe-details'
import { AiRecipesPage } from '@/pages/ai-recipes'
import { FavoriteRecipeDetailsPage } from '@/pages/favorite-recipe-details'
import { FavoritesPage } from '@/pages/favorites'
import { HomePage } from '@/pages/home'
import { MyRecipeCreatePage } from '@/pages/my-recipe-create'
import { MyRecipeEditPage } from '@/pages/my-recipe-edit'
import { MyRecipesPage } from '@/pages/my-recipes'
import { RandomRecipePage } from '@/pages/random-recipe'
import { RecipeDetailsPage } from '@/pages/recipe-details'
import { RecipesListPage } from '@/pages/recipes-list'
import { ROUTES } from '@/shared/constants/routes'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        element={<HomePage />}
        path={ROUTES.home}
      />
      <Route
        element={<RecipesListPage />}
        path={ROUTES.recipes}
      />
      <Route
        element={<RecipeDetailsPage />}
        path={ROUTES.recipeDetails}
      />
      <Route
        element={<RandomRecipePage />}
        path={ROUTES.randomRecipe}
      />
      <Route
        element={<MyRecipesPage />}
        path={ROUTES.myRecipes}
      />
      <Route
        element={<MyRecipeCreatePage />}
        path={ROUTES.myRecipeCreate}
      />
      <Route
        element={<MyRecipeEditPage />}
        path={ROUTES.myRecipeEdit}
      />
      <Route
        element={<FavoritesPage />}
        path={ROUTES.favorites}
      />
      <Route
        element={<FavoriteRecipeDetailsPage />}
        path={ROUTES.favoriteRecipeDetails}
      />
      <Route
        element={<AiRecipesPage />}
        path={ROUTES.aiRecipes}
      />
      <Route
        element={<AiRecipeDetailsPage />}
        path={ROUTES.aiRecipeDetails}
      />
      <Route
        element={(
          <Navigate
            replace
            to={ROUTES.home}
          />
        )}
        path="*"
      />
    </Routes>
  )
}
