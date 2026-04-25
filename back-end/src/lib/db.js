import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, '..', '..', 'db.json')

const defaultDb = {
  myRecipes: [],
  favorites: [],
  aiRecipes: [],
}

async function ensureDbFile() {
  await mkdir(path.dirname(dbPath), { recursive: true })

  try {
    await readFile(dbPath, 'utf-8')
  }
  catch {
    await writeFile(dbPath, JSON.stringify(defaultDb, null, 2), 'utf-8')
  }
}

export async function readDb() {
  await ensureDbFile()

  const raw = await readFile(dbPath, 'utf-8')

  try {
    const parsed = JSON.parse(raw)

    return {
      ...defaultDb,
      ...parsed,
      myRecipes: Array.isArray(parsed.myRecipes) ? parsed.myRecipes : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      aiRecipes: Array.isArray(parsed.aiRecipes) ? parsed.aiRecipes : [],
    }
  }
  catch {
    return defaultDb
  }
}

export async function writeDb(nextDb) {
  await ensureDbFile()
  await writeFile(dbPath, JSON.stringify(nextDb, null, 2), 'utf-8')
}
