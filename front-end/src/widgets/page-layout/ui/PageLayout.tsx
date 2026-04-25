import type { BreadcrumbItem } from '@/widgets/header'
import { NavLink } from 'react-router-dom'
import { navigationItems } from '@/shared/constants/navigation'
import { Header } from '@/widgets/header'
import styles from './PageLayout.module.css'

interface PageLayoutProps {
  title: string
  description?: string
  breadcrumbs: BreadcrumbItem[]
  children: React.ReactNode
  action?: React.ReactNode
}

export function PageLayout({
  title,
  description,
  breadcrumbs,
  children,
  action,
}: PageLayoutProps) {
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

        <div className={styles.promo}>
          <h3>
            Кулинарная привычка недели
          </h3>
          <p>
            Держите под рукой быстрые ужины и собственные рецепты в одном месте.
          </p>
        </div>
      </aside>

      <div className={styles.content}>
        <Header
          action={action}
          breadcrumbs={breadcrumbs}
          description={description}
          title={title}
        />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  )
}
