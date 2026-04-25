import type { MyRecipeFormValues } from '@/entities/my-recipe'
import { useState } from 'react'
import styles from './MyRecipeForm.module.css'

interface MyRecipeFormProps {
  initialValues?: MyRecipeFormValues
  submitLabel: string
  onSubmit: (values: MyRecipeFormValues) => Promise<void> | void
}

const defaultValues: MyRecipeFormValues = {
  title: '',
  description: '',
  imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
  cookingTime: 30,
  servings: 2,
  ingredients: '',
  instructions: '',
  category: '',
}

export function MyRecipeForm({
  initialValues = defaultValues,
  submitLabel,
  onSubmit,
}: MyRecipeFormProps) {
  const [values, setValues] = useState<MyRecipeFormValues>(initialValues)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    setValues(current => ({
      ...current,
      [name]: name === 'cookingTime' || name === 'servings' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit(values)
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div className={styles.grid}>
        <label>
          Название
          <input
            name="title"
            onChange={handleChange}
            required
            value={values.title}
          />
        </label>
        <label>
          Категория
          <input
            name="category"
            onChange={handleChange}
            required
            value={values.category}
          />
        </label>
        <label>
          Время, мин
          <input
            min="1"
            name="cookingTime"
            onChange={handleChange}
            required
            type="number"
            value={values.cookingTime}
          />
        </label>
        <label>
          Порции
          <input
            min="1"
            name="servings"
            onChange={handleChange}
            required
            type="number"
            value={values.servings}
          />
        </label>
      </div>

      <label>
        Картинка
        <input
          name="imageUrl"
          onChange={handleChange}
          required
          value={values.imageUrl}
        />
      </label>

      <label>
        Краткое описание
        <textarea
          name="description"
          onChange={handleChange}
          required
          rows={3}
          value={values.description}
        />
      </label>

      <label>
        Ингредиенты
        <textarea
          name="ingredients"
          onChange={handleChange}
          required
          rows={5}
          value={values.ingredients}
        />
      </label>

      <label>
        Инструкция
        <textarea
          name="instructions"
          onChange={handleChange}
          required
          rows={6}
          value={values.instructions}
        />
      </label>

      <button
        className={styles.submit}
        type="submit"
      >
        {submitLabel}
      </button>
    </form>
  )
}
