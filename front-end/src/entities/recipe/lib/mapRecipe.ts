import type {
  RecipeDetails,
  RecipeDetailsDto,
  RecipePreview,
  RecipePreviewDto,
} from '../model/types'
import { stripHtml } from './sanitizeRecipeSummary'

export function mapRecipePreview(dto: RecipePreviewDto): RecipePreview {
  return {
    id: dto.id,
    title: dto.title,
    imageUrl: dto.image,
  }
}

export function mapRecipeDetails(dto: RecipeDetailsDto): RecipeDetails {
  return {
    id: dto.id,
    title: dto.title,
    imageUrl: dto.image,
    readyInMinutes: dto.readyInMinutes,
    servings: dto.servings,
    summary: stripHtml(dto.summary),
    instructions: stripHtml(dto.instructions),
    dishTypes: dto.dishTypes,
    diets: dto.diets,
    cuisines: dto.cuisines ?? [],
  }
}
