import styles from './RandomRecipeButton.module.css'

interface RandomRecipeButtonProps {
  onClick: () => void
  isLoading?: boolean
}

export function RandomRecipeButton({ onClick, isLoading }: RandomRecipeButtonProps) {
  return (
    <button
      className={styles.button}
      disabled={isLoading}
      onClick={onClick}
      type="button"
    >
      {isLoading ? 'Подбираем...' : 'Получить случайный рецепт'}
    </button>
  )
}
