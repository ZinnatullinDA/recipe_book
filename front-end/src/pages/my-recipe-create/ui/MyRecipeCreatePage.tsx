import type { MyRecipeFormValues } from '@/entities/my-recipe'
import { useNavigate } from 'react-router-dom'
import { useMyRecipeStore } from '@/entities/my-recipe'
import { MyRecipeForm } from '@/features/my-recipe-form'
import { ROUTES } from '@/shared/constants/routes'
import { PageIntro } from '@/shared/ui'

export function MyRecipeCreatePage() {
  const navigate = useNavigate()
  const { createRecipe } = useMyRecipeStore()

  const handleSubmit = async (values: MyRecipeFormValues) => {
    const recipe = await createRecipe(values)

    if (recipe)
      navigate(ROUTES.myRecipes)
  }

  return (
    <>
      <PageIntro
        description="Форма для создания собственного рецепта пользователя."
        title="Создать свой рецепт"
      />
      <MyRecipeForm
        onSubmit={handleSubmit}
        submitLabel="Сохранить рецепт"
      />
    </>
  )
}
