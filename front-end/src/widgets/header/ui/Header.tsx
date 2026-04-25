import styles from './Header.module.css'

export interface BreadcrumbItem {
  label: string
}

interface HeaderProps {
  breadcrumbs: BreadcrumbItem[]
}

export function Header({ breadcrumbs }: HeaderProps) {
  return (
    <header className={styles.header}>
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
    </header>
  )
}
