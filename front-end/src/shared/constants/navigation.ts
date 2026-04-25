import { ROUTES } from './routes'

export const navigationItems = [
  {
    label: 'Главная',
    to: ROUTES.home,
    description: 'Обзор проекта и быстрые действия',
  },
  {
    label: 'Рецепты',
    to: ROUTES.recipes,
    description: 'Каталог рецептов из Spoonacular',
  },
  {
    label: 'Случайный рецепт',
    to: ROUTES.randomRecipe,
    description: 'Идея на ужин в один клик',
  },
  {
    label: 'Мои рецепты',
    to: ROUTES.myRecipes,
    description: 'Ваши собственные рецепты и CRUD',
  },
  {
    label: 'Избранное',
    to: ROUTES.favorites,
    description: 'Сохраненные рецепты на вашем backend',
  },
  {
    label: 'AI рецепт',
    to: ROUTES.aiRecipes,
    description: 'Три новых рецепта от GigaChat по вашему запросу',
  },
] as const
