/* eslint-disable react-refresh/only-export-components */
// AppStateProvider: central context provider for layout state (selectedCategory, results, history, favourites, sort, theme)
// Now implements category selection and recipe fetching via TheMealDB filter by category
import React, { useCallback, useMemo, useState } from 'react'
import { filterByCategory, type MealListItem } from '../services/mealApi'

export type AppState = {
  selectedCategory: string | null
  results: MealListItem[]
  loading: boolean
  error: string | null
  setCategory: (c: string) => void
  fetchByCategory: (c?: string) => Promise<void>
}

export const AppStateContext = React.createContext<AppState | undefined>(undefined)

const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [results, setResults] = useState<MealListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchByCategory = useCallback(async (c?: string) => {
    const category = (c ?? selectedCategory)?.trim()
    if (!category) return
    setLoading(true)
    setError(null)
    try {
      const items = await filterByCategory(category)
      setResults(items)
      if (!items || items.length === 0) setError('No recipes found for this category.')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch recipes.'
      setError(msg)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [selectedCategory])

  const setCategory = useCallback((c: string) => {
    setSelectedCategory(c)
  }, [])

  const value = useMemo<AppState>(() => ({
    selectedCategory,
    results,
    loading,
    error,
    setCategory,
    fetchByCategory,
  }), [selectedCategory, results, loading, error, setCategory, fetchByCategory])

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export default AppStateProvider
