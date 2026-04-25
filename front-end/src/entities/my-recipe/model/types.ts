export interface MyRecipe {
  id: string
  title: string
  description: string
  imageUrl: string
  cookingTime: number
  servings: number
  ingredients: string
  instructions: string
  category: string
}

export type MyRecipeFormValues = Omit<MyRecipe, 'id'>
