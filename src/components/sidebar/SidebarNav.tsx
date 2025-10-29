// SidebarNav: hoverable vertical category navigation (Burgers, Pizzas, Pastas, Desserts, Drinks, Trending)
// Purpose: Emits category selection via context actions
import React, { useContext } from 'react'
import NavItem from './NavItem'
import { AppStateContext } from '../../state/AppStateProvider'

const SidebarNav: React.FC = () => {
  const ctx = useContext(AppStateContext)
  if (!ctx) return null
  const { selectedCategory, setCategory, fetchByCategory } = ctx

  const items = ['Burgers', 'Pizzas', 'Pastas', 'Desserts', 'Drinks', 'Trending']
  return (
    <nav className="p-3 flex flex-col gap-2">
      <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Sidebar Navigation</div>
      {items.map((label) => (
        <NavItem
          key={label}
          label={label}
          active={selectedCategory === label}
          onClick={async () => { setCategory(label); await fetchByCategory(label) }}
        />
      ))}
    </nav>
  )
}

export default SidebarNav
