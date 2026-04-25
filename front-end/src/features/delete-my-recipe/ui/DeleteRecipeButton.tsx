import styles from './DeleteRecipeButton.module.css'

interface DeleteRecipeButtonProps {
  onClick: () => void
}

export function DeleteRecipeButton({ onClick }: DeleteRecipeButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type="button"
    >
      Удалить рецепт
    </button>
  )
}
