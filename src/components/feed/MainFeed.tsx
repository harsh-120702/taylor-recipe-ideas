// MainFeed: center scrollable area for recipes
// Purpose: Displays loading, error, and recipe cards from context (category-driven)
import React, { useContext } from 'react'
import { AppStateContext } from '../../state/AppStateProvider'

const MainFeed: React.FC = () => {
  const ctx = useContext(AppStateContext)
  if (!ctx) return null
  const { selectedCategory, results, loading, error, favorites, toggleFavorite, addHistoryMeal } = ctx

  return (
    <section className="min-h-full p-4">
      <div className="max-w-5xl mx-auto space-y-4">
        <header className="px-4 pt-4 pb-2 bg-gradient-to-b from-slate-100/50 to-transparent dark:from-slate-900/20 rounded-xl">
          <h1 className="text-xl font-semibold">{selectedCategory ? selectedCategory : 'Main Feed Area'}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {selectedCategory ? 'Showing recipes for the selected category.' : 'Pick a category from the left to load recipes.'}
          </p>
        </header>

        {loading && (
          <div className="py-10 flex items-center justify-center text-slate-500">Loading recipes...</div>
        )}

        {error && !loading && (
          <div className="rounded-md border border-red-200 bg-red-50 text-red-700 p-3">{error}</div>
        )}

        {!loading && !error && results && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((m) => (
              <div key={m.idMeal} className="rounded-xl ring-1 ring-slate-200/50 dark:ring-slate-800/60 bg-white/70 dark:bg-slate-900/30 overflow-hidden transition-shadow hover:shadow-sm">
                <button className="block w-full text-left" onClick={() => addHistoryMeal(m)}>
                  <img src={m.strMealThumb} alt={m.strMeal} className="w-full aspect-[4/3] object-cover" />
                </button>
                <div className="p-3 flex items-center justify-between">
                  <div className="font-medium pr-2 truncate" title={m.strMeal}>{m.strMeal}</div>
                  <button
                    aria-label="Toggle favourite"
                    onClick={() => toggleFavorite(m)}
                    className="text-violet-600 hover:scale-105 transition-transform"
                    title="Save to favourites"
                  >
                    {favorites.some((f) => f.idMeal === m.idMeal) ? '♥' : '♡'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default MainFeed
