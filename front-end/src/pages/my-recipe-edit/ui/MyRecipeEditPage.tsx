import type { MyRecipeFormValues } from '@/entities/my-recipe'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMyRecipes } from '@/entities/my-recipe'
import { MyRecipeForm } from '@/features/my-recipe-form'
import { ROUTES } from '@/shared/constants/routes'
import { Loader } from '@/shared/ui'
import { PageLayout } from '@/widgets/page-layout'

export function MyRecipeEditPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { recipes, isLoading, updateRecipe } = useMyRecipes()

  const recipe = useMemo(
    () => recipes.find(item => item.id === id),
    [id, recipes],
  )

  const handleSubmit = async (values: MyRecipeFormValues) => {
    if (!recipe)
      return

    const updated = await updateRecipe(recipe.id, values)

    if (updated)
      navigate(ROUTES.myRecipes)
  }

  return (
    <PageLayout
      breadcrumbs={[{ label: 'Главная' }, { label: 'Мои рецепты' }, { label: recipe?.title ?? 'Редактирование' }]}
      description="Редактирование уже сохраненного собственного рецепта."
      title="Редактировать рецепт"
    >
      {isLoading && <Loader />}
      {!isLoading && recipe && (
        <MyRecipeForm
          initialValues={{
            title: recipe.title,
            description: recipe.description,
            imageUrl: recipe.imageUrl,
            cookingTime: recipe.cookingTime,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            category: recipe.category,
          }}
          onSubmit={handleSubmit}
          submitLabel="Обновить рецепт"
        />
      )}
      {!isLoading && !recipe && (
        <button
          onClick={() => navigate(ROUTES.myRecipes)}
          type="button"
        >
          Вернуться к моим рецептам
        </button>
      )}
    </PageLayout>
  )
}
