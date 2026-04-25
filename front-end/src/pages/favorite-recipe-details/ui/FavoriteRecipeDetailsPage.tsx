import type { FavoriteRecipe } from '@/entities/favorite-recipe'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { favoriteRecipeApi, useFavoriteRecipeStore } from '@/entities/favorite-recipe'
import { RecipeDetails } from '@/entities/recipe'
import { ROUTES } from '@/shared/constants/routes'
import { EmptyState, ErrorMessage, Loader } from '@/shared/ui'
import { PageLayout } from '@/widgets/page-layout'
import styles from './FavoriteRecipeDetailsPage.module.css'

export function FavoriteRecipeDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const removeRecipe = useFavoriteRecipeStore(state => state.removeRecipe)
  const [recipe, setRecipe] = useState<FavoriteRecipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id)
      return

    const loadRecipe = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await favoriteRecipeApi.getFavoriteById(id)
        setRecipe(data)
      }
      catch {
        setError('Не удалось открыть избранный рецепт.')
      }
      finally {
        setIsLoading(false)
      }
    }

    void loadRecipe()
  }, [id])

  const handleRemove = async () => {
    if (!recipe)
      return

    await removeRecipe(recipe.id)
    navigate(ROUTES.favorites)
  }

  return (
    <PageLayout
      breadcrumbs={[{ label: 'Главная' }, { label: 'Избранное' }, { label: recipe?.title ?? 'Детали' }]}
      description="Полная информация о сохраненном рецепте."
      title={recipe?.title ?? 'Избранный рецепт'}
    >
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && !recipe && (
        <EmptyState
          description="Скорее всего, этот рецепт уже был удален из избранного."
          title="Рецепт не найден"
        />
      )}
      {!isLoading && !error && recipe && (
        <RecipeDetails
          action={(
            <button
              className={styles.action}
              onClick={() => void handleRemove()}
              type="button"
            >
              Убрать из избранного
            </button>
          )}
          recipe={recipe}
        />
      )}
    </PageLayout>
  )
}
