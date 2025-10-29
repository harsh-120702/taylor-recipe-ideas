// SidebarNav: hoverable vertical category navigation (Burgers, Pizzas, Pastas, Desserts, Drinks, Trending)
// Purpose: Emits category selection via context actions
import React, { useContext } from 'react'
import NavItem from './NavItem'
import { AppStateContext } from '../../state/AppStateProvider'
import ThemeToggle from '../theme/ThemeToggle'

const SidebarNav: React.FC = () => {
  const ctx = useContext(AppStateContext)
  if (!ctx) return null
  const { selectedCategory, setCategory, fetchByCategory } = ctx

  const items = ['Burgers', 'Pizzas', 'Pastas', 'Desserts', 'Drinks', 'Trending']
  return (
    <nav className="p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Menu</div>
        <ThemeToggle />
      </div>
      <div className="h-px bg-slate-200/60 dark:bg-slate-800/60" />
      <div className="flex flex-col gap-1">
        {items.map((label) => (
          <NavItem
            key={label}
            label={label}
            active={selectedCategory === label}
            onClick={async () => { setCategory(label); await fetchByCategory(label) }}
          />
        ))}
      </div>
    </nav>
  )
}

export default SidebarNav
