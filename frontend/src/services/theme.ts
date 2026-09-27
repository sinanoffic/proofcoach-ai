export type Theme = 'dark' | 'light'
export const THEME_KEY = 'proofcoach-theme'

export function readTheme(storage?: Pick<Storage, 'getItem'>): Theme {
  try { return storage?.getItem(THEME_KEY) === 'light' ? 'light' : 'dark' }
  catch { return 'dark' }
}

export function saveTheme(theme: Theme, storage?: Pick<Storage, 'setItem'>): void {
  try { storage?.setItem(THEME_KEY, theme) } catch { /* Unavailable in some private browsing modes. */ }
}
