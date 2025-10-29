// NavItem: single clickable/hoverable entry in the left sidebar
// Purpose: Displays a category label and indicates active selection
import React from 'react'

type Props = { label: string; active?: boolean; onClick?: () => void }

const NavItem: React.FC<Props> = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'relative group text-left px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded before:bg-violet-500 before:transition-opacity',
        active
          ? 'bg-violet-600/10 text-violet-700 dark:text-violet-300 font-semibold before:opacity-100'
          : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 before:opacity-0 group-hover:before:opacity-60'
      ].join(' ')}
      aria-current={active ? 'page' : undefined}
      aria-label={label}
    >
      <span>{label}</span>
    </button>
  )
}

export default NavItem
