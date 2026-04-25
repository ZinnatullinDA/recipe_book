const curatedFoodImages = {
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
  soup: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
  sushi: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
  rice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
  chicken: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=1200&q=80',
  dessert: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80',
  breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
  mexican: 'https://images.unsplash.com/photo-1565299585323-38174c4a6471?auto=format&fit=crop&w=1200&q=80',
  indian: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80',
  japanese: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80',
  french: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80',
  italian: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
  american: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
  asian: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
  default: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80',
}

function normalizeTags(value) {
  if (!Array.isArray(value))
    return []

  return value
    .map(item => String(item).trim())
    .filter(Boolean)
}

function fallbackImageUrl(...parts) {
  const normalized = parts
    .flat()
    .map(part => String(part ?? '').toLowerCase().trim())
    .filter(Boolean)

  const matchedKey = Object.keys(curatedFoodImages).find(key =>
    key !== 'default' && normalized.some(part => part.includes(key)),
  )

  return curatedFoodImages[matchedKey ?? 'default']
}

export function normalizeRecipeDetails(input, options = {}) {
  const sourceType = options.sourceType ?? input.sourceType ?? 'custom'
  const sourceId = options.sourceId ?? input.sourceId ?? input.id ?? crypto.randomUUID()

  return {
    id: String(options.id ?? input.id ?? crypto.randomUUID()),
    sourceType,
    sourceId: String(sourceId),
    sourceKey: options.sourceKey ?? input.sourceKey ?? `${sourceType}:${sourceId}`,
    title: String(input.title ?? '').trim(),
    imageUrl: String(input.imageUrl ?? '').trim() || fallbackImageUrl(
      input.title ?? sourceId,
      input.dishTypes?.[0],
      input.cuisines?.[0],
    ),
    readyInMinutes: Number(input.readyInMinutes ?? input.cookingTime ?? 30),
    servings: Number(input.servings ?? 2),
    summary: String(input.summary ?? input.description ?? '').trim(),
    instructions: String(input.instructions ?? '').trim(),
    dishTypes: normalizeTags(input.dishTypes),
    diets: normalizeTags(input.diets),
    cuisines: normalizeTags(input.cuisines),
  }
}

export function toMyRecipe(input) {
  const recipe = normalizeRecipeDetails(input)

  return {
    id: String(input.id ?? crypto.randomUUID()),
    title: recipe.title,
    description: recipe.summary,
    imageUrl: recipe.imageUrl,
    cookingTime: recipe.readyInMinutes,
    servings: recipe.servings,
    ingredients: String(input.ingredients ?? '').trim() || recipe.dishTypes.join(', ') || 'Уточните ингредиенты перед приготовлением.',
    instructions: recipe.instructions,
    category: String(input.category ?? '').trim() || recipe.cuisines[0] || recipe.dishTypes[0] || 'Авторский рецепт',
  }
}

export function validateMyRecipePayload(input) {
  const requiredFields = [
    'title',
    'description',
    'imageUrl',
    'cookingTime',
    'servings',
    'ingredients',
    'instructions',
    'category',
  ]

  return requiredFields.every((field) => {
    const value = input?.[field]

    if (field === 'cookingTime' || field === 'servings')
      return Number(value) > 0

    return String(value ?? '').trim().length > 0
  })
}

export function validateRecipeDetailsPayload(input) {
  return ['title', 'summary', 'instructions'].every(field => String(input?.[field] ?? '').trim())
}
