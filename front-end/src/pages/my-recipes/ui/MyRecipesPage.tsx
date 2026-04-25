import { Link } from 'react-router-dom'
import { mapMyRecipeToRecipeDetails, useMyRecipes } from '@/entities/my-recipe'
import { ROUTES } from '@/shared/constants/routes'
import { EmptyState, ErrorMessage, Loader, PageIntro } from '@/shared/ui'
import { RecipesGrid } from '@/widgets/recipes-grid'
import styles from './MyRecipesPage.module.css'

export function MyRecipesPage() {
  const { recipes, isLoading, error } = useMyRecipes()
  const cards = recipes.map(mapMyRecipeToRecipeDetails)

  return (
    <>
      <PageIntro
        action={(
          <Link
            className={styles.addButton}
            to={ROUTES.myRecipeCreate}
          >
          Добавить рецепт
          </Link>
        )}
        description="Раздел CRUD: создание, редактирование и удаление рецептов пользователя. Данные хранятся на Node.js backend в db.json."
        title="Мои рецепты"
      />
      <div className={styles.stack}>
        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && recipes.length === 0 && (
          <EmptyState
            description="Создайте первый рецепт и он сразу появится в этом разделе."
            title="Пока нет ни одного собственного рецепта"
          />
        )}

        {!isLoading && !error && recipes.length > 0 && (
          <RecipesGrid recipes={cards} />
        )}
      </div>
    </>
  )
}
