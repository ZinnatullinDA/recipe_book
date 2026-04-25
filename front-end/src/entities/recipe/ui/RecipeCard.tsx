import type { RecipeDetails, RecipePreview } from '../model/types'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { formatCookingTime } from '@/shared/lib/formatCookingTime'
import styles from './RecipeCard.module.css'

interface RecipeCardProps {
  recipe: RecipePreview | RecipeDetails
  subtitle?: string
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const sourceType = (recipe as RecipeDetails).sourceType
  const isFavoriteRecord = 'sourceKey' in recipe && 'sourceId' in recipe && sourceType !== 'ai' && sourceType !== 'my'
  const detailsLink = sourceType === 'ai'
    ? ROUTES.aiRecipeDetails.replace(':id', String(recipe.id))
    : isFavoriteRecord
        ? ROUTES.favoriteRecipeDetails.replace(':id', String(recipe.id))
        : sourceType === 'my'
            ? ROUTES.myRecipeDetails.replace(':id', String(recipe.id))
            : ROUTES.recipeDetails.replace(':recipeId', String(recipe.id))

  const time = 'readyInMinutes' in recipe ? formatCookingTime(recipe.readyInMinutes) : null

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
        {time && (
          <span className={styles.badge}>
            {time}
          </span>
        )}
      </div>
      <div className={styles.content}>
        <h3>
          {recipe.title}
        </h3>
      </div>
    </Link>
  )
}
