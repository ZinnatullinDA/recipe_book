import type { RecipeDetails as RecipeDetailsModel } from '../model/types'
import { formatCookingTime } from '@/shared/lib/formatCookingTime'
import styles from './RecipeDetails.module.css'

interface RecipeDetailsProps {
  recipe: RecipeDetailsModel
  action?: React.ReactNode
}

export function RecipeDetails({ recipe, action }: RecipeDetailsProps) {
  return (
    <article className={styles.details}>
      <div className={styles.hero}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            Подробности рецепта
          </span>
          <h1>
            {recipe.title}
          </h1>
          <p>
            {recipe.summary}
          </p>
          <div className={styles.meta}>
            <span>
              Время:
              {formatCookingTime(recipe.readyInMinutes)}
            </span>
            <span>
              Порций:
              {recipe.servings}
            </span>
          </div>
          {action}
        </div>
        <img
          alt={recipe.title}
          className={styles.image}
          src={recipe.imageUrl}
        />
      </div>

      <div className={styles.columns}>
        <section className={styles.card}>
          <h2>
            Инструкция
          </h2>
          <p>
            {recipe.instructions || 'Подробная инструкция отсутствует в ответе API.'}
          </p>
        </section>

        <section className={styles.card}>
          <h2>
            Категории
          </h2>
          <div className={styles.tags}>
            {[...recipe.dishTypes, ...recipe.diets, ...recipe.cuisines].map(tag => (
              <span key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
