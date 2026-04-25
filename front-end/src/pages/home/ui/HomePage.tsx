import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { PageLayout } from '@/widgets/page-layout'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <PageLayout
      breadcrumbs={[{ label: 'Главная' }]}
      description="Pet-проект для просмотра рецептов через Spoonacular API, backend CRUD, избранного и AI-рецептов."
      title="Recipe Book App"
    >
      <section className={styles.hero}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            FSD + React + TypeScript
          </span>
          <h2>
            Одна кулинарная панель для внешних рецептов, своих находок и AI-подсказок
          </h2>
          <p>
            Приложение разделено по слоям, использует общий API-клиент в `shared`
            и покрывает обязательные состояния: loading, error, empty и success.
          </p>
          <div className={styles.actions}>
            <Link
              className={styles.primary}
              to={ROUTES.recipes}
            >
              Открыть каталог
            </Link>
            <Link
              className={styles.secondary}
              to={ROUTES.myRecipes}
            >
              Мои рецепты
            </Link>
          </div>
        </div>

        <div className={styles.stats}>
          <article>
            <strong>
              API
            </strong>
            <span>
              Spoonacular через axios-обертку
            </span>
          </article>
          <article>
            <strong>
              CRUD
            </strong>
            <span>
              Node.js + Express + `db.json`
            </span>
          </article>
          <article>
            <strong>
              AI
            </strong>
            <span>
              GigaChat генерирует 3 рецепта по пожеланию
            </span>
          </article>
        </div>
      </section>
    </PageLayout>
  )
}
