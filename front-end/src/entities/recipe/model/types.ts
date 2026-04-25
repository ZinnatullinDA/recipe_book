export interface RecipePreviewDto {
  id: number
  title: string
  image: string
  imageType: string
}

export interface RecipesSearchResponse {
  results: RecipePreviewDto[]
  offset: number
  number: number
  totalResults: number
}

export interface RecipeDetailsDto {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
  summary: string
  instructions: string
  dishTypes: string[]
  diets: string[]
  cuisines?: string[]
}

export interface RandomRecipeResponse {
  recipes: RecipeDetailsDto[]
}

export interface RecipePreview {
  id: number | string
  title: string
  imageUrl: string
}

export interface RecipeDetails {
  id: number | string
  title: string
  imageUrl: string
  readyInMinutes: number
  servings: number
  summary: string
  ingredients?: string
  instructions: string
  dishTypes: string[]
  diets: string[]
  cuisines: string[]
  sourceType?: string
  sourceId?: string
  sourceKey?: string
}
