// FavoritesPanel: shows saved/favourite recipes
// Purpose: Render list of favorites; allow remove and view in feed
import React, { useContext } from 'react'
import { AppStateContext } from '../../state/AppStateProvider'

const FavoritesPanel: React.FC = () => {
  const ctx = useContext(AppStateContext)
  if (!ctx) return null
  const { favorites, removeFavorite, showRecipe } = ctx

  return (
    <section>
      <h2 className="text-sm font-semibold mb-2">Favourites Panel</h2>
      <div className="space-y-2">
        {favorites.length === 0 && (
          <div className="text-xs text-slate-500">No favourites yet</div>
        )}
        {favorites.map((m) => (
          <div key={m.idMeal} className="flex items-center gap-2 rounded-md border border-slate-200/60 dark:border-slate-800/60 p-2 text-sm">
            <button onClick={() => showRecipe(m)} className="flex items-center gap-2 flex-1 text-left hover:underline">
              <img src={m.strMealThumb} alt={m.strMeal} className="w-10 h-10 rounded object-cover" />
              <span className="font-medium truncate">{m.strMeal}</span>
            </button>
            <button aria-label="Remove favourite" className="text-xs px-2 py-1 rounded border" onClick={() => removeFavorite(m.idMeal)}>×</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FavoritesPanel
