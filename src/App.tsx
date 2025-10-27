import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { filterByIngredient, getMealDetails, type MealDetail, type MealListItem } from './services/mealApi'

function App() {
  // Ingredients as a list of tokens and an input for editing
  const [ingredients, setIngredients] = useState<string[]>([])
  const [inputVal, setInputVal] = useState('')

  const [meals, setMeals] = useState<MealListItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selected, setSelected] = useState<MealDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mood, setMood] = useState('')
  const [time, setTime] = useState('')
  const [sort, setSort] = useState<'name' | 'random'>('name')

  const canSearch = ingredients.length > 0

  function applySort(list: MealListItem[]) {
    if (sort === 'name') return [...list].sort((a, b) => a.strMeal.localeCompare(b.strMeal))
    if (sort === 'random') return [...list].sort(() => Math.random() - 0.5)
    return list
  }


  function handleAddFromInput() {
    // allow comma-separated batch
    const parts = inputVal
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean)
    if (parts.length) {
      setIngredients((prev) => Array.from(new Set([...prev, ...parts])))
      setInputVal('')
    }
  }

  function removeIngredient(i: string) {
    setIngredients((prev) => prev.filter((x) => x !== i))
  }

  function clearAll() {
    setIngredients([])
    setMeals([])
    setSelectedId(null)
    setSelected(null)
    setError(null)
  }

  async function search() {
    if (!canSearch) return
    setLoading(true)
    setError(null)
    setSelectedId(null)
    setSelected(null)
    try {
      // Query TheMealDB per-ingredient, then intersect results by id
      const lists = await Promise.all(ingredients.map((i) => filterByIngredient(i)))
      let result: MealListItem[] = []
      if (lists.length === 1) {
        result = lists[0]
      } else {
        result = lists.reduce<MealListItem[]>((acc, list, idx) => {
          if (idx === 0) return list
          const ids = new Set(list.map((m) => m.idMeal))
          return acc.filter((m) => ids.has(m.idMeal))
        }, [])
      }

      // Sort before showing
      result = applySort(result)
      setMeals(result)
      if (result.length === 0) setError('No meals found for those ingredients.')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong fetching meals.'
      setError(msg)
      setMeals([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!selectedId) return
    let active = true
    ;(async () => {
      try {
        const details = await getMealDetails(selectedId)
        if (active) setSelected(details)
      } catch {
        // ignore detail errors quietly
      }
    })()
    return () => {
      active = false
    }
  }, [selectedId])

  const header = useMemo(() => {
    const parts = [] as string[]
    if (ingredients.length) parts.push(`Ingredients: ${ingredients.join(', ')}`)
    if (mood) parts.push(`Mood: ${mood}`)
    if (time) parts.push(`Time: ${time}`)
    return parts.join(' • ')
  }, [ingredients, mood, time])

  return (
    <div id="app">
      <section className="hero">
        <div className="hero-inner">
          <header style={{ marginBottom: 16, textAlign: 'center' }}>
            <h1>Recipe Ideas</h1>
            <p>Find meals Taylor can cook based on what he has and how he feels.</p>
          </header>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              search()
            }}
            className="controls"
          >
            <div className="ingredient-input">
              <input
                aria-label="Ingredient"
                placeholder="Add ingredient (press Enter or comma)"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddFromInput()
                  } else if (e.key === ',' ) {
                    e.preventDefault()
                    handleAddFromInput()
                  }
                }}
              />
              <button type="button" onClick={handleAddFromInput} aria-label="Add ingredient">Add</button>
            </div>

            {ingredients.length > 0 && (
              <div className="chips" aria-label="Selected ingredients">
                {ingredients.map((ing) => (
                  <span key={ing} className="chip">
                    {ing}
                    <button type="button" className="chip-x" aria-label={`Remove ${ing}`} onClick={() => removeIngredient(ing)}>
                      ×
                    </button>
                  </span>
                ))}
                <button type="button" className="clear" onClick={clearAll}>Clear</button>
              </div>
            )}

            <select value={mood} onChange={(e) => setMood(e.target.value)} aria-label="Mood">
              <option value="">Mood (optional)</option>
              <option>Comforting</option>
              <option>Light</option>
              <option>Spicy</option>
              <option>Adventurous</option>
            </select>
            <select value={time} onChange={(e) => setTime(e.target.value)} aria-label="Time">
              <option value="">Time (optional)</option>
              <option>Under 15 min</option>
              <option>Under 30 min</option>
              <option>Under 60 min</option>
            </select>
            <button type="submit" disabled={!canSearch || loading}>
              {loading ? 'Searching…' : 'Search'}
            </button>
          </form>
        </div>
      </section>

      {header && <p className="context">{header}</p>}

      {meals.length > 1 && (
        <div className="sort-row">
          <label htmlFor="sort" className="visually-hidden">Sort results</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => {
              const v = e.target.value as 'name' | 'random'
              setSort(v)
              setMeals((prev) => applySort(prev))
            }}
            aria-label="Sort results"
          >
            <option value="name">Sort: A → Z</option>
            <option value="random">Sort: Random</option>
          </select>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <section className="grid">
        {meals.map((m) => (
          <article key={m.idMeal} className={`card ${selectedId === m.idMeal ? 'active' : ''}`}>
            <button className="card-btn" onClick={() => setSelectedId(m.idMeal)}>
              <img src={m.strMealThumb} alt={m.strMeal} />
              <h3>{m.strMeal}</h3>
            </button>
          </article>
        ))}
      </section>

      {selected && (
        <section className="details">
          <h2>{selected.strMeal}</h2>
          <p className="sub">{[selected.strCategory, selected.strArea].filter(Boolean).join(' • ')}</p>
          <div className="details-body">
            <img src={selected.strMealThumb} alt={selected.strMeal} />
            <p>{selected.strInstructions?.slice(0, 500)}{(selected.strInstructions?.length ?? 0) > 500 ? '…' : ''}</p>
          </div>
          <div className="links">
            {selected.strYoutube && (
              <a href={selected.strYoutube} target="_blank" rel="noreferrer">YouTube</a>
            )}
            {selected.strSource && (
              <a href={selected.strSource} target="_blank" rel="noreferrer">Source</a>
            )}
          </div>
        </section>
      )}

      <footer className="footer">Powered by TheMealDB</footer>
    </div>
  )
}

export default App
