// RightPanel: fixed right-side vertical panel split into History (top) and Favourites (bottom)
// Purpose: Placeholder halves to verify layout
import React from 'react'
import HistoryPanel from './HistoryPanel'
import FavoritesPanel from './FavoritesPanel'

const RightPanel: React.FC = () => {
  return (
    <div className="grid grid-rows-2 h-full">
      <div className="overflow-y-auto border-b border-slate-200/50 dark:border-slate-800/60 p-3">
        <HistoryPanel />
      </div>
      <div className="overflow-y-auto p-3">
        <FavoritesPanel />
      </div>
    </div>
  )
}

export default RightPanel
