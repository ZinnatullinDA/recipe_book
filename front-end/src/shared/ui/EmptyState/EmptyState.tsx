import styles from './EmptyState.module.css'

interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <h3>
        {title}
      </h3>
      <p>
        {description}
      </p>
    </div>
  )
}
