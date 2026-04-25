import crypto from 'node:crypto'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { readDb, writeDb } from './lib/db.js'
import { generateAiRecipes } from './lib/gigachat.js'
import {
  normalizeRecipeDetails,
  toMyRecipe,
  validateMyRecipePayload,
  validateRecipeDetailsPayload,
} from './lib/recipe-mappers.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 3001)

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/my-recipes', async (_req, res) => {
  const db = await readDb()
  res.json(db.myRecipes)
})

app.get('/api/my-recipes/:id', async (req, res) => {
  const db = await readDb()
  const recipe = db.myRecipes.find(item => item.id === req.params.id)

  if (!recipe)
    return res.status(404).json({ message: 'Recipe not found' })

  return res.json(recipe)
})

app.post('/api/my-recipes', async (req, res) => {
  if (!validateMyRecipePayload(req.body))
    return res.status(400).json({ message: 'Invalid recipe payload' })

  const db = await readDb()
  const recipe = {
    ...req.body,
    id: crypto.randomUUID(),
    cookingTime: Number(req.body.cookingTime),
    servings: Number(req.body.servings),
  }

  db.myRecipes.push(recipe)
  await writeDb(db)
  return res.status(201).json(recipe)
})

app.put('/api/my-recipes/:id', async (req, res) => {
  if (!validateMyRecipePayload(req.body))
    return res.status(400).json({ message: 'Invalid recipe payload' })

  const db = await readDb()
  const index = db.myRecipes.findIndex(item => item.id === req.params.id)

  if (index === -1)
    return res.status(404).json({ message: 'Recipe not found' })

  const updatedRecipe = {
    ...db.myRecipes[index],
    ...req.body,
    id: req.params.id,
    cookingTime: Number(req.body.cookingTime),
    servings: Number(req.body.servings),
  }

  db.myRecipes[index] = updatedRecipe
  await writeDb(db)
  return res.json(updatedRecipe)
})

app.delete('/api/my-recipes/:id', async (req, res) => {
  const db = await readDb()
  const nextRecipes = db.myRecipes.filter(item => item.id !== req.params.id)

  if (nextRecipes.length === db.myRecipes.length)
    return res.status(404).json({ message: 'Recipe not found' })

  db.myRecipes = nextRecipes
  await writeDb(db)
  return res.status(204).send()
})

app.post('/api/my-recipes/import', async (req, res) => {
  if (!validateRecipeDetailsPayload(req.body))
    return res.status(400).json({ message: 'Invalid recipe payload' })

  const db = await readDb()
  const recipe = toMyRecipe(req.body)

  db.myRecipes.push(recipe)
  await writeDb(db)
  return res.status(201).json(recipe)
})

app.get('/api/favorites', async (_req, res) => {
  const db = await readDb()
  res.json(db.favorites)
})

app.get('/api/favorites/:id', async (req, res) => {
  const db = await readDb()
  const recipe = db.favorites.find(item => item.id === req.params.id)

  if (!recipe)
    return res.status(404).json({ message: 'Favorite recipe not found' })

  return res.json(recipe)
})

app.post('/api/favorites', async (req, res) => {
  if (!validateRecipeDetailsPayload(req.body))
    return res.status(400).json({ message: 'Invalid favorite recipe payload' })

  const db = await readDb()
  const recipe = normalizeRecipeDetails(req.body)
  const existingRecipe = db.favorites.find(item => item.sourceKey === recipe.sourceKey)

  if (existingRecipe)
    return res.json(existingRecipe)

  const favorite = {
    ...recipe,
    id: crypto.randomUUID(),
  }

  db.favorites.push(favorite)
  await writeDb(db)
  return res.status(201).json(favorite)
})

app.delete('/api/favorites/:id', async (req, res) => {
  const db = await readDb()
  const nextFavorites = db.favorites.filter(item => item.id !== req.params.id)

  if (nextFavorites.length === db.favorites.length)
    return res.status(404).json({ message: 'Favorite recipe not found' })

  db.favorites = nextFavorites
  await writeDb(db)
  return res.status(204).send()
})

app.get('/api/ai-recipes', async (_req, res) => {
  const db = await readDb()
  res.json(db.aiRecipes)
})

app.get('/api/ai-recipes/:id', async (req, res) => {
  const db = await readDb()
  const recipe = db.aiRecipes.find(item => item.id === req.params.id)

  if (!recipe)
    return res.status(404).json({ message: 'AI recipe not found' })

  return res.json(recipe)
})

app.post('/api/ai-recipes/generate', async (req, res) => {
  const prompt = String(req.body?.prompt ?? '').trim()

  if (!prompt)
    return res.status(400).json({ message: 'Prompt is required' })

  try {
    const db = await readDb()
    const rawRecipes = await generateAiRecipes(prompt)
    const recipes = rawRecipes.map((item, index) => normalizeRecipeDetails(item, {
      id: crypto.randomUUID(),
      sourceType: 'ai',
      sourceId: `${Date.now()}-${index + 1}`,
    }))

    db.aiRecipes = [...recipes, ...db.aiRecipes].slice(0, 30)
    await writeDb(db)
    return res.status(201).json(recipes)
  }
  catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate AI recipes'
    return res.status(500).json({ message })
  }
})

app.listen(port, () => {
  console.log(`Recipe Book backend started on http://localhost:${port}`)
})
