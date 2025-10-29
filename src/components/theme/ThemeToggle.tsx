// ThemeToggle: toggles light/dark mode, persists to localStorage ('theme:v1')
import React, { useEffect, useState } from 'react'

const KEY = 'theme:v1'

type Mode = 'light' | 'dark'

function apply(mode: Mode) {
  const root = document.documentElement
  if (mode === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

const ThemeToggle: React.FC = () => {
  const [mode, setMode] = useState<Mode>('light')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY) as Mode | null
      const initial: Mode = stored ?? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      setMode(initial)
      apply(initial)
    } catch {
      // ignore
    }
  }, [])

  function toggle() {
    const next: Mode = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    try { localStorage.setItem(KEY, next) } catch { /* no-op */ }
    apply(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm border border-slate-200/50 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/40 backdrop-blur transition-colors duration-300"
    >
      <span className="select-none">{mode === 'dark' ? '🌙' : '🌞'}</span>
      <span className="hidden sm:inline">{mode === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}

export default ThemeToggle