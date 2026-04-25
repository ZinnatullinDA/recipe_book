import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useFavoriteRecipes } from '@/entities/favorite-recipe'
import { RecipeDetails, useRecipeDetails } from '@/entities/recipe'
import { EmptyState, ErrorMessage, Loader, PageIntro } from '@/shared/ui'
import styles from './RecipeDetailsPage.module.css'

export function RecipeDetailsPage() {
  const { recipeId } = useParams()
  const { recipe, isLoading, error } = useRecipeDetails(recipeId)
  const { recipes: favorites, addRecipe, removeRecipe } = useFavoriteRecipes()

  const favoriteRecipe = useMemo(() => {
    if (!recipe)
      return null

    return favorites.find(item => item.sourceKey === `spoonacular:${recipe.id}`) ?? null
  }, [favorites, recipe])

  return (
    <>
      <PageIntro
        description="Полная информация о рецепте: картинка, описание, время, порции и инструкция."
        title={recipe?.title ?? 'Детали рецепта'}
      />
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && !recipe && (
        <EmptyState
          description="Похоже, рецепт не был найден по переданному идентификатору."
          title="Рецепт не найден"
        />
      )}
      {!isLoading && !error && recipe && (
        <RecipeDetails
          action={favoriteRecipe
            ? (
                <button
                  className={styles.action}
                  onClick={() => void removeRecipe(favoriteRecipe.id)}
                  type="button"
                >
                  Убрать из избранного
                </button>
              )
            : (
                <button
                  className={styles.action}
                  onClick={() => void addRecipe({
                    ...recipe,
                    sourceType: 'spoonacular',
                    sourceId: String(recipe.id),
                    sourceKey: `spoonacular:${recipe.id}`,
                  })}
                  type="button"
                >
                  Добавить в избранное
                </button>
              )}
          recipe={recipe}
        />
      )}
    </>
  )
}
