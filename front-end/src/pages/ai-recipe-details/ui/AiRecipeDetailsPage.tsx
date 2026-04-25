import type { AiRecipe } from '@/entities/ai-recipe'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { aiRecipeApi } from '@/entities/ai-recipe'
import { useMyRecipeStore } from '@/entities/my-recipe'
import { RecipeDetails } from '@/entities/recipe'
import { ROUTES } from '@/shared/constants/routes'
import { EmptyState, ErrorMessage, Loader, PageIntro } from '@/shared/ui'
import styles from './AiRecipeDetailsPage.module.css'

export function AiRecipeDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const importRecipe = useMyRecipeStore(state => state.importRecipe)
  const [recipe, setRecipe] = useState<AiRecipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id)
      return

    const loadRecipe = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await aiRecipeApi.getRecipeById(id)
        setRecipe(data)
      }
      catch {
        setError('Не удалось открыть AI-рецепт.')
      }
      finally {
        setIsLoading(false)
      }
    }

    void loadRecipe()
  }, [id])

  const handleSave = async () => {
    if (!recipe)
      return

    try {
      setIsSaving(true)
      const savedRecipe = await importRecipe(recipe)

      if (savedRecipe)
        navigate(ROUTES.myRecipes)
    }
    finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <PageIntro
        description="Детали AI-рецепта с возможностью сохранить его в ваши рецепты."
        title={recipe?.title ?? 'AI-рецепт'}
      />
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && !recipe && (
        <EmptyState
          description="Попробуйте снова сгенерировать рецепты на странице AI."
          title="AI-рецепт не найден"
        />
      )}
      {!isLoading && !error && recipe && (
        <RecipeDetails
          action={(
            <button
              className={styles.action}
              disabled={isSaving}
              onClick={() => void handleSave()}
              type="button"
            >
              {isSaving ? 'Сохраняем...' : 'Сохранить в мои рецепты'}
            </button>
          )}
          recipe={recipe}
        />
      )}
    </>
  )
}
