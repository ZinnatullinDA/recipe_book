function normalizeTags(value) {
  if (!Array.isArray(value))
    return []

  return value
    .map(item => String(item).trim())
    .filter(Boolean)
}

function fallbackImageUrl(seed) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/800`
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
    imageUrl: String(input.imageUrl ?? '').trim() || fallbackImageUrl(input.title ?? sourceId),
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
