const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, options)
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.detail || 'Local API unavailable')
  return response.json() as Promise<T>
}

export async function parseResume(file: File) {
  const body = new FormData(); body.append('file', file)
  return apiFetch<Record<string, unknown>>('/api/resume/parse', { method: 'POST', body })
}

export async function deleteBackendData() {
  try { return await apiFetch('/api/data', { method: 'DELETE' }) }
  catch { return { deleted: ['browser profile', 'browser demo state'], backend: 'offline' } }
}

