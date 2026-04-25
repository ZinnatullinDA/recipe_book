import crypto from 'node:crypto'

const authUrl = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth'
const chatUrl = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions'

let cachedToken = null
let tokenExpiresAt = 0

function applyTlsSettings() {
  if (process.env.GIGACHAT_SKIP_TLS_VERIFY === 'true')
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

async function parseJsonResponse(response) {
  const text = await response.text()

  try {
    return JSON.parse(text)
  }
  catch {
    throw new Error(text || 'Unexpected response from GigaChat')
  }
}

async function getAccessToken() {
  applyTlsSettings()

  const now = Date.now()

  if (cachedToken && tokenExpiresAt > now + 10_000)
    return cachedToken

  const authKey = process.env.GIGACHAT_AUTH_KEY

  if (!authKey)
    throw new Error('GIGACHAT_AUTH_KEY is not configured')

  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${authKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      RqUID: crypto.randomUUID(),
    },
    body: new URLSearchParams({
      scope: process.env.GIGACHAT_SCOPE || 'GIGACHAT_API_PERS',
    }),
  })

  const data = await parseJsonResponse(response)

  if (!response.ok || !data.access_token)
    throw new Error(data.message || 'Failed to authorize in GigaChat')

  cachedToken = data.access_token
  tokenExpiresAt = Number(data.expires_at ?? 0) * 1000

  return cachedToken
}

function extractJsonArray(content) {
  const fencedMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fencedMatch?.[1] ?? content
  const start = candidate.indexOf('[')
  const end = candidate.lastIndexOf(']')

  if (start === -1 || end === -1)
    throw new Error('AI did not return a JSON array')

  return candidate.slice(start, end + 1)
}

export async function generateAiRecipes(prompt) {
  applyTlsSettings()

  const token = await getAccessToken()
  const response = await fetch(chatUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.GIGACHAT_MODEL || 'GigaChat-2-Pro',
      stream: false,
      temperature: 0.9,
      max_tokens: 2500,
      messages: [
        {
          role: 'system',
          content: [
            'Ты помощник кулинарного приложения.',
            'Верни строго JSON-массив из 3 рецептов без markdown и без пояснений.',
            'Поля каждого объекта: title, summary, instructions, readyInMinutes, servings, dishTypes, diets, cuisines.',
            'dishTypes, diets, cuisines должны быть массивами строк.',
            'Текст пиши на русском языке.',
            'Никаких других полей не добавляй.',
          ].join(' '),
        },
        {
          role: 'user',
          content: `Пожелания пользователя: ${prompt}`,
        },
      ],
    }),
  })

  const data = await parseJsonResponse(response)
  const content = data?.choices?.[0]?.message?.content

  if (!response.ok || !content)
    throw new Error(data.message || 'Failed to generate recipes in GigaChat')

  const parsed = JSON.parse(extractJsonArray(content))

  if (!Array.isArray(parsed) || parsed.length !== 3)
    throw new Error('AI must return exactly 3 recipes')

  return parsed
}
