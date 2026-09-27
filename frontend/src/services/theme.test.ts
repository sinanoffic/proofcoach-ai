import { describe, expect, it } from 'vitest'
import { readTheme, saveTheme, THEME_KEY } from './theme'

describe('theme preference', () => {
  it('defaults to dark for absent, invalid, or blocked storage', () => {
    expect(readTheme({ getItem: () => null })).toBe('dark')
    expect(readTheme({ getItem: () => 'unexpected' })).toBe('dark')
    expect(readTheme({ getItem: () => { throw new Error('blocked') } })).toBe('dark')
  })

  it('persists light independently of candidate demo state', () => {
    const values = new Map<string, string>([['proofcoach-demo-v1', '{"name":"Demo Candidate"}']])
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value) } }
    saveTheme('light', storage)
    expect(readTheme(storage)).toBe('light')
    expect(values.get(THEME_KEY)).toBe('light')
    expect(values.get('proofcoach-demo-v1')).toBe('{"name":"Demo Candidate"}')
  })
})
