import styles from './Loader.module.css'

export function Loader() {
  return (
    <div className={styles.loaderWrap}>
      <div className={styles.loader} />
      <p className={styles.text}>
        Загружаем рецепты и детали...
      </p>
    </div>
  )
}
