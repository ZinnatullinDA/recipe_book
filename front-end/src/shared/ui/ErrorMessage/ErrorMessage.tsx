import styles from './ErrorMessage.module.css'

interface ErrorMessageProps {
  title?: string
  message: string
}

export function ErrorMessage({ title = 'Что-то пошло не так', message }: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <strong>
        {title}
      </strong>
      <p>
        {message}
      </p>
    </div>
  )
}
