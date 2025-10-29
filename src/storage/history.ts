// historyStorage: persist capped list of HistoryEntry under 'history:v1'
import { type HistoryEntry } from '../state/AppStateProvider'

const KEY = 'history:v1'
const LIMIT = 12

function safeParse<T>(raw: string | null, fallback: T): T {
  try { return raw ? JSON.parse(raw) as T : fallback } catch { return fallback }
}

export const historyStorage = {
  get(): HistoryEntry[] {
    return safeParse<HistoryEntry[]>(localStorage.getItem(KEY), [])
  },
  set(list: HistoryEntry[]) {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, LIMIT)))
  },
  append(current: HistoryEntry[], entry: HistoryEntry): HistoryEntry[] {
    const deduped = current.filter((e) => !(e.kind === entry.kind && e.label === entry.label))
    const next = [entry, ...deduped].slice(0, LIMIT)
    this.set(next)
    return next
  },
  clear() {
    localStorage.removeItem(KEY)
  },
}
