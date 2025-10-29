// favoritesStorage: persist a list of MealListItem in localStorage under 'favorites:v1'
import { type MealListItem } from '../services/mealApi'

const KEY = 'favorites:v1'

function safeParse<T>(raw: string | null, fallback: T): T {
  try { return raw ? JSON.parse(raw) as T : fallback } catch { return fallback }
}

export const favoritesStorage = {
  get(): MealListItem[] {
    return safeParse<MealListItem[]>(localStorage.getItem(KEY), [])
  },
  set(list: MealListItem[]) {
    localStorage.setItem(KEY, JSON.stringify(list))
  },
  has(id: string): boolean {
    return this.get().some((m) => m.idMeal === id)
  },
  toggle(meal: MealListItem): MealListItem[] {
    const cur = this.get()
    const exists = cur.some((m) => m.idMeal === meal.idMeal)
    const next = exists ? cur.filter((m) => m.idMeal !== meal.idMeal) : [meal, ...cur]
    this.set(next)
    return next
  },
}
