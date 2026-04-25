import { useState } from 'react'
import { useAiRecipes } from '@/entities/ai-recipe'
import { RecipeCard } from '@/entities/recipe'
import { EmptyState, ErrorMessage, Loader } from '@/shared/ui'
import { PageLayout } from '@/widgets/page-layout'
import styles from './AiRecipesPage.module.css'

export function AiRecipesPage() {
  const [prompt, setPrompt] = useState('')
  const { recipes, isLoading, isGenerating, error, generateRecipes } = useAiRecipes()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedPrompt = prompt.trim()

    if (!normalizedPrompt)
      return

    await generateRecipes(normalizedPrompt)
  }

  return (
    <PageLayout
      breadcrumbs={[{ label: 'Главная' }, { label: 'AI рецепт' }]}
      description="Пользователь описывает пожелания, а GigaChat возвращает 3 готовых рецепта."
      title="AI рецепт"
    >
      <div className={styles.stack}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <label className={styles.label}>
            Чего вам хочется сегодня?
            <textarea
              className={styles.input}
              onChange={event => setPrompt(event.target.value)}
              placeholder="Например: хочу сытный ужин с курицей, рисом и овощами без грибов"
              rows={4}
              value={prompt}
            />
          </label>
          <button
            className={styles.submit}
            disabled={isGenerating}
            type="submit"
          >
            {isGenerating ? 'Генерируем...' : 'Получить 3 рецепта'}
          </button>
        </form>

        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && recipes.length === 0 && (
          <EmptyState
            description="Введите пожелания выше, и AI подберет для вас три варианта."
            title="AI-рецептов пока нет"
          />
        )}
        {!isLoading && !error && recipes.length > 0 && (
          <section className={styles.grid}>
            {recipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                subtitle={recipe.summary}
              />
            ))}
          </section>
        )}
      </div>
    </PageLayout>
  )
}
