import { Link } from 'react-router-dom'

export function Brand({ compact = false }: { compact?: boolean }) {
  return <Link to="/" className="brand" aria-label="ProofCoach AI home">
    <span className="brand-mark"><img src="/assets/phoenix-watermark.jpg" alt="" /></span>
    {!compact && <span><strong>PROOFCOACH</strong><small>AI</small></span>}
  </Link>
}

export function PhoenixWatermark({ className = '' }: { className?: string }) {
  return <img className={`phoenix-watermark ${className}`} src="/assets/phoenix-watermark.jpg" alt="" aria-hidden="true" />
}

