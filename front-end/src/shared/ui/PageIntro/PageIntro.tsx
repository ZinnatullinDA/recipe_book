import styles from './PageIntro.module.css'

interface PageIntroProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function PageIntro({ title, description, action }: PageIntroProps) {
  return (
    <section className={styles.intro}>
      <div>
        <h1 className={styles.title}>
          {title}
        </h1>
        {description && (
          <p className={styles.description}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className={styles.action}>
          {action}
        </div>
      )}
    </section>
  )
}
