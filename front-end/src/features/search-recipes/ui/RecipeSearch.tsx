import { useEffect, useState } from 'react'
import styles from './RecipeSearch.module.css'

interface RecipeSearchProps {
  initialValue?: string
  initialCuisine?: string
  cuisines: string[]
  onSearch: (query: string, cuisine: string) => void
}

export function RecipeSearch({
  initialValue = '',
  initialCuisine = '',
  cuisines,
  onSearch,
}: RecipeSearchProps) {
  const [value, setValue] = useState(initialValue)
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    setSelectedCuisine(initialCuisine)
  }, [initialCuisine])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(value.trim(), selectedCuisine)
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <input
        className={styles.input}
        onChange={event => setValue(event.target.value)}
        placeholder="Например, pasta, salad, soup..."
        value={value}
      />
      <select
        className={styles.select}
        onChange={event => setSelectedCuisine(event.target.value)}
        value={selectedCuisine}
      >
        <option value="">
          All cuisines
        </option>
        {cuisines.map(cuisine => (
          <option
            key={cuisine}
            value={cuisine}
          >
            {cuisine}
          </option>
        ))}
      </select>
      <button
        className={styles.button}
        type="submit"
      >
        Найти рецепты
      </button>
    </form>
  )
}
