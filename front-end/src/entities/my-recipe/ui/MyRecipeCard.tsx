import type { MyRecipe } from '../model/types'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import styles from './MyRecipeCard.module.css'

interface MyRecipeCardProps {
  recipe: MyRecipe
}

export function MyRecipeCard({ recipe }: MyRecipeCardProps) {
  const editLink = ROUTES.myRecipeEdit.replace(':id', recipe.id)

  return (
    <article className={styles.card}>
      <img
        alt={recipe.title}
        className={styles.image}
        src={recipe.imageUrl}
      />
      <div className={styles.content}>
        <div>
          <span className={styles.tag}>
            {recipe.category}
          </span>
          <h3>
            {recipe.title}
          </h3>
          <p>
            {recipe.description}
          </p>
        </div>
        <div className={styles.meta}>
          <span>
            {recipe.cookingTime}
            {' '}
            мин
          </span>
          <span>
            {recipe.servings}
            {' '}
            порц.
          </span>
        </div>
        <Link
          className={styles.link}
          to={editLink}
        >
          Редактировать
        </Link>
      </div>
    </article>
  )
}
