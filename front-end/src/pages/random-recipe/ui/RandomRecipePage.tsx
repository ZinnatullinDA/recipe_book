import { RecipeCard, useRandomRecipe } from '@/entities/recipe'
import { RandomRecipeButton } from '@/features/get-random-recipe'
import { ErrorMessage, Loader, PageIntro } from '@/shared/ui'
import styles from './RandomRecipePage.module.css'

export function RandomRecipePage() {
  const { recipe, isLoading, error, fetchRandomRecipe } = useRandomRecipe()

  return (
    <>
      <PageIntro
        action={(
          <RandomRecipeButton
            isLoading={isLoading}
            onClick={() => void fetchRandomRecipe()}
          />
        )}
        description="Сценарий отдельной фичи: пользователь нажимает кнопку, идет запрос и отображается одна карточка."
        title="Случайный рецепт"
      />
      <div className={styles.stack}>
        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && recipe && (
          <div className={styles.cardWrap}>
            <RecipeCard recipe={recipe} />
          </div>
        )}
      </div>
    </>
  )
}
