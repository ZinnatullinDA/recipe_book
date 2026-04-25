import type { RecipeDetailsModel, RecipePreview } from '@/entities/recipe'
import { RecipeCard } from '@/entities/recipe'
import styles from './RecipesGrid.module.css'

interface RecipesGridProps {
  recipes: Array<RecipePreview | RecipeDetailsModel>
}

export function RecipesGrid({ recipes }: RecipesGridProps) {
  return (
    <section className={styles.grid}>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
        />
      ))}
    </section>
  )
}
