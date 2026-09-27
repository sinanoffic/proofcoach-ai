export function videoId(value: string): string | null {
  try {
    const url = new URL(value)
    const host = url.hostname.toLowerCase()
    const id = host === 'youtu.be' ? url.pathname.slice(1) : ['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host) ? url.searchParams.get('v') ?? (url.pathname.startsWith('/embed/') ? url.pathname.split('/')[2] : '') : ''
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null
  } catch { return null }
}
