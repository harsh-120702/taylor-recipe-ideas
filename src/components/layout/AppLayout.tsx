// AppLayout: top-level 3-pane layout (Left SidebarNav, Center MainFeed, RightPanel)
// Purpose: Establish responsive 12-col grid with 2/8/2 split and sticky side panels
import React from 'react'
import SidebarNav from '../sidebar/SidebarNav'
import MainFeed from '../feed/MainFeed'
import RightPanel from '../panels/RightPanel'
import AppStateProvider from '../../state/AppStateProvider'

const AppLayout: React.FC = () => {
  return (
    <AppStateProvider>
      <div className="h-screen grid grid-cols-12 md:gap-4 gap-2 bg-slate-50/90 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans tracking-tight">
        <aside className="col-span-12 md:col-span-2 lg:col-span-2 sticky top-0 h-screen overflow-y-auto border-r border-slate-200/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/40 backdrop-blur">
          <SidebarNav />
        </aside>

        <main className="col-span-12 md:col-span-8 lg:col-span-8 overflow-y-auto">
          <MainFeed />
        </main>

        <aside className="hidden md:block md:col-span-2 lg:col-span-2 sticky top-0 h-screen overflow-y-auto border-l border-slate-200/40 dark:border-slate-800/50 bg-white/60 dark:bg-slate-900/40 backdrop-blur">
          <RightPanel />
        </aside>
      </div>
    </AppStateProvider>
  )
}

export default AppLayout
