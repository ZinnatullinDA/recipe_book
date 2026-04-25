import type { MyRecipe } from '../model/types'
import styles from './MyRecipeDetails.module.css'

interface MyRecipeDetailsProps {
  recipe: MyRecipe
}

export function MyRecipeDetails({ recipe }: MyRecipeDetailsProps) {
  return (
    <article className={styles.details}>
      <img
        alt={recipe.title}
        className={styles.image}
        src={recipe.imageUrl}
      />
      <div className={styles.copy}>
        <span className={styles.category}>
          {recipe.category}
        </span>
        <h1>
          {recipe.title}
        </h1>
        <p>
          {recipe.description}
        </p>
        <div className={styles.meta}>
          <span>
            {recipe.cookingTime}
            {' '}
            мин
          </span>
          <span>
            {recipe.servings}
            {' '}
            порций
          </span>
        </div>
        <section>
          <h2>
            Ингредиенты
          </h2>
          <p>
            {recipe.ingredients}
          </p>
        </section>
        <section>
          <h2>
            Инструкция
          </h2>
          <p>
            {recipe.instructions}
          </p>
        </section>
      </div>
    </article>
  )
}
