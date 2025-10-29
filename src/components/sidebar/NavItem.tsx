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
        'group text-left px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500',
        active ? 'bg-violet-600/10 text-violet-700 dark:text-violet-300 font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
      ].join(' ')}
      aria-current={active ? 'page' : undefined}
      aria-label={label}
    >
      <span>{label}</span>
    </button>
  )
}

export default NavItem
