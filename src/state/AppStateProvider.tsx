/* eslint-disable react-refresh/only-export-components */
// AppStateProvider: central context provider for layout state (selectedCategory, results, history, favourites, sort, theme)
// Now implements category selection and recipe fetching via TheMealDB filter by category
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { filterByCategory, type MealListItem } from '../services/mealApi'
import { favoritesStorage } from '../storage/favorites'
import { historyStorage } from '../storage/history'

export type HistoryEntry = { kind: 'category' | 'meal'; ts: number; label: string; meal?: MealListItem }

export type AppState = {
  selectedCategory: string | null
  results: MealListItem[]
  loading: boolean
  error: string | null
  favorites: MealListItem[]
  history: HistoryEntry[]
  setCategory: (c: string) => void
  fetchByCategory: (c?: string) => Promise<void>
  toggleFavorite: (m: MealListItem) => void
  removeFavorite: (id: string) => void
  clearFavorites: () => void
  addHistoryCategory: (category: string) => void
  addHistoryMeal: (meal: MealListItem) => void
  clearHistory: () => void
  showRecipe: (meal: MealListItem) => void
}

export const AppStateContext = React.createContext<AppState | undefined>(undefined)

const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [results, setResults] = useState<MealListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<MealListItem[]>([])
  const [history, setHistory] = useState<HistoryEntry[]>([])

  // Load persisted favorites and history on mount
  useEffect(() => {
    try {
      setFavorites(favoritesStorage.get())
      setHistory(historyStorage.get())
    } catch {
      // ignore
    }
  }, [])

  // History actions (placed before fetchByCategory to avoid TS hoist issues)
  const addHistoryCategory = useCallback((category: string) => {
    setHistory((prev) => {
      const entry: HistoryEntry = { kind: 'category', ts: Date.now(), label: category }
      const next = historyStorage.append(prev, entry)
      return next
    })
  }, [])

  const fetchByCategory = useCallback(async (c?: string) => {
    const category = (c ?? selectedCategory)?.trim()
    if (!category) return
    setLoading(true)
    setError(null)
    try {
      const items = await filterByCategory(category)
      setResults(items)
      addHistoryCategory(category)
      if (!items || items.length === 0) setError('No recipes found for this category.')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch recipes.'
      setError(msg)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, addHistoryCategory])

  const setCategory = useCallback((c: string) => {
    setSelectedCategory(c)
  }, [])

  // Favorites actions
  const toggleFavorite = useCallback((m: MealListItem) => {
    setFavorites((prev) => {
      const exists = prev.some((x) => x.idMeal === m.idMeal)
      const next = exists ? prev.filter((x) => x.idMeal !== m.idMeal) : [m, ...prev]
      favoritesStorage.set(next)
      return next
    })
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.filter((x) => x.idMeal !== id)
      favoritesStorage.set(next)
      return next
    })
  }, [])

  const clearFavorites = useCallback(() => {
    favoritesStorage.set([])
    setFavorites([])
  }, [])

  const addHistoryMeal = useCallback((meal: MealListItem) => {
    setHistory((prev) => {
      const entry: HistoryEntry = { kind: 'meal', ts: Date.now(), label: meal.strMeal, meal }
      const next = historyStorage.append(prev, entry)
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    historyStorage.clear()
    setHistory([])
  }, [])

  const showRecipe = useCallback((meal: MealListItem) => {
    setResults([meal])
  }, [])

  const value = useMemo<AppState>(() => ({
    selectedCategory,
    results,
    loading,
    error,
    favorites,
    history,
    setCategory,
    fetchByCategory,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    addHistoryCategory,
    addHistoryMeal,
    clearHistory,
    showRecipe,
  }), [selectedCategory, results, loading, error, favorites, history, setCategory, fetchByCategory, toggleFavorite, removeFavorite, clearFavorites, addHistoryCategory, addHistoryMeal, clearHistory, showRecipe])

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export default AppStateProvider
