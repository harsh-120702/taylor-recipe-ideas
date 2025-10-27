export type MealListItem = {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

export type MealDetail = MealListItem & {
  strCategory?: string
  strArea?: string
  strInstructions?: string
  strYoutube?: string
  strSource?: string
}

const API_BASE = 'https://www.themealdb.com/api/json/v1/1'

export async function filterByIngredient(ingredient: string): Promise<MealListItem[]> {
  const url = `${API_BASE}/filter.php?i=${encodeURIComponent(ingredient.trim())}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Network error: ${res.status}`)
  const data = await res.json()
  return data.meals ?? []
}

export async function getMealDetails(id: string): Promise<MealDetail | null> {
  const url = `${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Network error: ${res.status}`)
  const data = await res.json()
  return data.meals?.[0] ?? null
}