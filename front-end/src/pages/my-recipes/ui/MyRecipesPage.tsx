import { Link } from 'react-router-dom'
import { mapMyRecipeToRecipeDetails, useMyRecipes } from '@/entities/my-recipe'
import { ROUTES } from '@/shared/constants/routes'
import { EmptyState, ErrorMessage, Loader } from '@/shared/ui'
import { PageLayout } from '@/widgets/page-layout'
import { RecipesGrid } from '@/widgets/recipes-grid'
import styles from './MyRecipesPage.module.css'

export function MyRecipesPage() {
  const { recipes, isLoading, error } = useMyRecipes()
  const cards = recipes.map(mapMyRecipeToRecipeDetails)

  return (
    <PageLayout
      action={(
        <Link
          className={styles.addButton}
          to={ROUTES.myRecipeCreate}
        >
          Добавить рецепт
        </Link>
      )}
      breadcrumbs={[{ label: 'Главная' }, { label: 'Мои рецепты' }]}
      description="Раздел CRUD: создание, редактирование и удаление рецептов пользователя. Данные хранятся на Node.js backend в db.json."
      title="Мои рецепты"
    >
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
    </PageLayout>
  )
}
