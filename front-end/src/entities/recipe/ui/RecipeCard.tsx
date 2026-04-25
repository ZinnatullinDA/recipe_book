import type { RecipeDetails, RecipePreview } from '../model/types'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { formatCookingTime } from '@/shared/lib/formatCookingTime'
import styles from './RecipeCard.module.css'

interface RecipeCardProps {
  recipe: RecipePreview | RecipeDetails
  subtitle?: string
}

export function RecipeCard({ recipe, subtitle }: RecipeCardProps) {
  const detailsLink = (recipe as RecipeDetails).sourceType === 'ai'
    ? ROUTES.aiRecipeDetails.replace(':id', String(recipe.id))
    : (recipe as RecipeDetails).sourceType
        ? ROUTES.favoriteRecipeDetails.replace(':id', String(recipe.id))
        : ROUTES.recipeDetails.replace(':recipeId', String(recipe.id))
  const time = 'readyInMinutes' in recipe ? formatCookingTime(recipe.readyInMinutes) : 'Откройте рецепт'

  return (
    <Link
      className={styles.card}
      to={detailsLink}
    >
      <div className={styles.imageWrap}>
        <img
          alt={recipe.title}
          className={styles.image}
          src={recipe.imageUrl}
        />
        <span className={styles.badge}>
          {time}
        </span>
      </div>
      <div className={styles.content}>
        <h3>
          {recipe.title}
        </h3>
        <p>
          {subtitle ?? 'Рецепт из коллекции Spoonacular'}
        </p>
      </div>
    </Link>
  )
}
