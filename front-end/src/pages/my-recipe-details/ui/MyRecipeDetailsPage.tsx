import type { MyRecipe } from '@/entities/my-recipe'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { mapMyRecipeToRecipeDetails, myRecipeApi, useMyRecipeStore } from '@/entities/my-recipe'
import { RecipeDetails } from '@/entities/recipe'
import { DeleteRecipeButton } from '@/features/delete-my-recipe'
import { ROUTES } from '@/shared/constants/routes'
import { EmptyState, ErrorMessage, Loader, PageIntro } from '@/shared/ui'
import styles from './MyRecipeDetailsPage.module.css'

export function MyRecipeDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const deleteRecipe = useMyRecipeStore(state => state.deleteRecipe)
  const [recipe, setRecipe] = useState<MyRecipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id)
      return

    const loadRecipe = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await myRecipeApi.getMyRecipeById(id)
        setRecipe(data)
      }
      catch {
        setError('Не удалось открыть ваш рецепт.')
      }
      finally {
        setIsLoading(false)
      }
    }

    void loadRecipe()
  }, [id])

  const handleDelete = async () => {
    if (!recipe)
      return

    try {
      setIsDeleting(true)
      const isDeleted = await deleteRecipe(recipe.id)

      if (isDeleted)
        navigate(ROUTES.myRecipes)
    }
    finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <PageIntro
        description="Полная информация о пользовательском рецепте с возможностью отредактировать или удалить его."
        title={recipe?.title ?? 'Мой рецепт'}
      />
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && !recipe && (
        <EmptyState
          description="Возможно, рецепт был удалён или ещё не успел загрузиться."
          title="Рецепт не найден"
        />
      )}
      {!isLoading && !error && recipe && (
        <RecipeDetails
          action={(
            <div className={styles.actions}>
              <Link
                className={styles.editAction}
                to={ROUTES.myRecipeEdit.replace(':id', recipe.id)}
              >
                Редактировать рецепт
              </Link>
              <div className={isDeleting ? styles.deleteDisabled : undefined}>
                <DeleteRecipeButton onClick={() => void handleDelete()} />
              </div>
            </div>
          )}
          recipe={mapMyRecipeToRecipeDetails(recipe)}
        />
      )}
    </>
  )
}
