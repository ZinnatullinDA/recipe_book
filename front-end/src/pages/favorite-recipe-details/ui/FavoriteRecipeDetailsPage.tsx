import type { FavoriteRecipe } from '@/entities/favorite-recipe'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { favoriteRecipeApi, useFavoriteRecipeStore } from '@/entities/favorite-recipe'
import { RecipeDetails } from '@/entities/recipe'
import { ROUTES } from '@/shared/constants/routes'
import { EmptyState, ErrorMessage, Loader, PageIntro } from '@/shared/ui'
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
        setError('РќРµ СѓРґР°Р»РѕСЃСЊ РѕС‚РєСЂС‹С‚СЊ РёР·Р±СЂР°РЅРЅС‹Р№ СЂРµС†РµРїС‚.')
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
    <>
      <PageIntro
        description="Полная информация о сохраненном рецепте."
        title={recipe?.title ?? 'Избранный рецепт'}
      />
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
    </>
  )
}
