import { useFavoriteRecipes } from '@/entities/favorite-recipe'
import { RecipeCard } from '@/entities/recipe'
import { EmptyState, ErrorMessage, Loader } from '@/shared/ui'
import { PageLayout } from '@/widgets/page-layout'
import styles from './FavoritesPage.module.css'

export function FavoritesPage() {
  const { recipes, isLoading, error } = useFavoriteRecipes()

  return (
    <PageLayout
      breadcrumbs={[{ label: 'Главная' }, { label: 'Избранное' }]}
      description="Сохраненные рецепты с возможностью открыть детали и убрать их из избранного."
      title="Избранные рецепты"
    >
      <div className={styles.stack}>
        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && recipes.length === 0 && (
          <EmptyState
            description="На детальной странице обычного рецепта можно добавить его в избранное."
            title="Избранных рецептов пока нет"
          />
        )}
        {!isLoading && !error && recipes.length > 0 && (
          <section className={styles.grid}>
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                subtitle="Сохранено в избранное"
              />
            ))}
          </section>
        )}
      </div>
    </PageLayout>
  )
}
