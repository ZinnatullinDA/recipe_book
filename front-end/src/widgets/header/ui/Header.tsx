import styles from './Header.module.css'

export interface BreadcrumbItem {
  label: string
}

interface HeaderProps {
  title: string
  description?: string
  breadcrumbs: BreadcrumbItem[]
  action?: React.ReactNode
}

export function Header({ title, description, breadcrumbs, action }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <nav
          aria-label="Хлебные крошки"
          className={styles.breadcrumbs}
        >
          {breadcrumbs.map(item => (
            <span key={item.label}>
              {item.label}
            </span>
          ))}
        </nav>
        <div className={styles.titleRow}>
          <div>
            <h1>
              {title}
            </h1>
            {description && (
              <p>
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      </div>
    </header>
  )
}
