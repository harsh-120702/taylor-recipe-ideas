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
        'group text-left px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors',
        active
          ? 'bg-violet-600/10 text-violet-700 dark:text-violet-300 font-semibold border-l-2 border-violet-500'
          : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
      ].join(' ')}
      aria-current={active ? 'page' : undefined}
      aria-label={label}
    >
      <span>{label}</span>
    </button>
  )
}

export default NavItem
