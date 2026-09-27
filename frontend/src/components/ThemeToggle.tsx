import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const target = theme === 'dark' ? 'Light' : 'Dark'
  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${target.toLowerCase()} theme`} title={`${target} theme`} aria-pressed={theme === 'light'}>
    {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
  </button>
}
