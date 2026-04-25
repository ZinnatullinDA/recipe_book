import type { BreadcrumbItem } from '@/widgets/header'
import { matchPath, NavLink, Outlet, useLocation } from 'react-router-dom'
import { navigationItems } from '@/shared/constants/navigation'
import { ROUTES } from '@/shared/constants/routes'
import { Header } from '@/widgets/header'
import styles from './PageLayout.module.css'

const breadcrumbByRoute: Array<{
  path: string
  breadcrumbs: BreadcrumbItem[]
}> = [
  {
    path: ROUTES.home,
    breadcrumbs: [{ label: 'Главная' }],
  },
  {
    path: ROUTES.recipes,
    breadcrumbs: [{ label: 'Главная' }, { label: 'Рецепты' }],
  },
  {
    path: ROUTES.recipeDetails,
    breadcrumbs: [{ label: 'Главная' }, { label: 'Рецепты' }, { label: 'Детали' }],
  },
  {
    path: ROUTES.randomRecipe,
    breadcrumbs: [{ label: 'Главная' }, { label: 'Случайный рецепт' }],
  },
  {
    path: ROUTES.myRecipes,
    breadcrumbs: [{ label: 'Главная' }, { label: 'Мои рецепты' }],
  },
  {
    path: ROUTES.myRecipeCreate,
    breadcrumbs: [{ label: 'Главная' }, { label: 'Мои рецепты' }, { label: 'Создание' }],
  },
  {
    path: ROUTES.myRecipeEdit,
    breadcrumbs: [{ label: 'Главная' }, { label: 'Мои рецепты' }, { label: 'Редактирование' }],
  },
  {
    path: ROUTES.myRecipeDetails,
    breadcrumbs: [{ label: 'Главная' }, { label: 'Мои рецепты' }, { label: 'Детали' }],
  },
  {
    path: ROUTES.favorites,
    breadcrumbs: [{ label: 'Главная' }, { label: 'Избранное' }],
  },
  {
    path: ROUTES.favoriteRecipeDetails,
    breadcrumbs: [{ label: 'Главная' }, { label: 'Избранное' }, { label: 'Детали' }],
  },
  {
    path: ROUTES.aiRecipes,
    breadcrumbs: [{ label: 'Главная' }, { label: 'AI рецепт' }],
  },
  {
    path: ROUTES.aiRecipeDetails,
    breadcrumbs: [{ label: 'Главная' }, { label: 'AI рецепт' }, { label: 'Детали' }],
  },
]

function getBreadcrumbs(pathname: string) {
  return breadcrumbByRoute.find(route => matchPath({ path: route.path, end: true }, pathname))?.breadcrumbs
    ?? [{ label: 'Главная' }]
}

export function PageLayout() {
  const { pathname } = useLocation()
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            RB
          </div>
          <div>
            <strong>
              Recipe Book
            </strong>
            <p>
              Книга рецептов с внешним API и своим CRUD
            </p>
          </div>
        </div>

        <nav className={styles.nav}>
          {navigationItems.map(item => (
            <NavLink
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
              key={item.to}
              to={item.to}
            >
              <span>
                {item.label}
              </span>
              <small>
                {item.description}
              </small>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className={styles.content}>
        <Header breadcrumbs={breadcrumbs} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
