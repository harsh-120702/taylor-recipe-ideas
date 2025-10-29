// HistoryPanel: shows search history list and actions
// Purpose: Render recent categories/meals; clicking category refetches; clear button
import React, { useContext } from 'react'
import { AppStateContext } from '../../state/AppStateProvider'

const HistoryPanel: React.FC = () => {
  const ctx = useContext(AppStateContext)
  if (!ctx) return null
  const { history, clearHistory, setCategory, fetchByCategory } = ctx

  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold">History Panel</h2>
        <button type="button" className="text-xs px-2 py-1 rounded border" onClick={clearHistory}>Clear</button>
      </div>
      <div className="space-y-2">
        {history.length === 0 && (
          <div className="text-xs text-slate-500">No history yet</div>
        )}
        {history.map((h) => (
          <button
            key={`${h.ts}-${h.label}`}
            className="w-full text-left rounded-lg ring-1 ring-slate-200/50 dark:ring-slate-800/60 p-2 text-sm hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
            onClick={async () => {
              if (h.kind === 'category') { setCategory(h.label); await fetchByCategory(h.label) }
            }}
          >
            <div className="font-medium">{h.label}</div>
            <div className="text-xs text-slate-500">{h.kind === 'category' ? 'Category' : 'Meal'} • {new Date(h.ts).toLocaleString()}</div>
          </button>
        ))}
      </div>
    </section>
  )
}

export default HistoryPanel
