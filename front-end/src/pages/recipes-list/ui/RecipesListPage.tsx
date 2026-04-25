import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useRecipes } from '@/entities/recipe'
import { RecipeSearch } from '@/features/search-recipes'
import { EmptyState, ErrorMessage, Loader, PageIntro } from '@/shared/ui'
import { RecipesGrid } from '@/widgets/recipes-grid'
import styles from './RecipesListPage.module.css'

const cuisines = ['Italian', 'American', 'Asian', 'Indian', 'French', 'Mexican', 'Japanese']

export function RecipesListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const cuisine = searchParams.get('cuisine') ?? ''
  const {
    recipes,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    fetchNextPage,
  } = useRecipes(query, cuisine)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = sentinelRef.current

    if (!node || isLoading || recipes.length === 0 || !hasMore)
      return

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries

      if (entry?.isIntersecting)
        void fetchNextPage()
    }, {
      root: null,
      rootMargin: '300px 0px',
      threshold: 0,
    })

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [fetchNextPage, hasMore, isLoading, recipes.length])

  const description = useMemo(() => {
    const parts = []

    if (query)
      parts.push(`по запросу "${query}"`)

    if (cuisine)
      parts.push(`по кухне "${cuisine}"`)

    return parts.length > 0
      ? `Результаты поиска ${parts.join(' ')}. Новые карточки подгружаются при прокрутке вниз.`
      : 'Подборка рецептов из Spoonacular с поиском, фильтром по кухне и бесконечной прокруткой.'
  }, [cuisine, query])

  return (
    <>
      <PageIntro
        description={description}
        title="Каталог рецептов"
      />
      <div className={styles.stack}>
        <RecipeSearch
          cuisines={cuisines}
          initialCuisine={cuisine}
          initialValue={query}
          onSearch={(value, selectedCuisine) => {
            const nextParams = new URLSearchParams()

            if (value)
              nextParams.set('q', value)

            if (selectedCuisine)
              nextParams.set('cuisine', selectedCuisine)

            setSearchParams(nextParams)
          }}
        />

        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && !error && recipes.length === 0 && (
          <EmptyState
            description="Попробуйте изменить поисковый запрос или выбрать другую кухню."
            title="Рецепты не найдены"
          />
        )}
        {!isLoading && !error && recipes.length > 0 && (
          <>
            <RecipesGrid recipes={recipes} />
            {hasMore && (
              <div
                aria-hidden="true"
                className={styles.sentinel}
                ref={sentinelRef}
              />
            )}
            {isLoadingMore && <Loader />}
            {!hasMore && (
              <p className={styles.end}>
                Вы просмотрели все найденные рецепты.
              </p>
            )}
          </>
        )}
      </div>
    </>
  )
}
