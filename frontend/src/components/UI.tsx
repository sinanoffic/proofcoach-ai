import { AlertTriangle, Check, CircleAlert, CircleCheck, Info, LockKeyhole, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'

export function PageIntro({ kicker, title, children, actions }: { kicker: string, title: string, children: ReactNode, actions?: ReactNode }) {
  return <div className="page-intro"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2><p>{children}</p></div>{actions && <div className="intro-actions">{actions}</div>}</div>
}

export function Panel({ title, subtitle, children, className = '', action }: { title?: string, subtitle?: string, children: ReactNode, className?: string, action?: ReactNode }) {
  return <section className={`panel ${className}`}>{(title || action) && <div className="panel-top">{title && <div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>}{action}</div>}{children}</section>
}

export function StatusPill({ state, children }: { state: 'pass' | 'warn' | 'danger' | 'info' | 'muted', children: ReactNode }) {
  const Icon = state === 'pass' ? Check : state === 'warn' ? AlertTriangle : state === 'danger' ? CircleAlert : state === 'info' ? Info : ShieldCheck
  return <span className={`status-pill ${state}`}><Icon size={13} />{children}</span>
}

export function MetricCard({ label, value, suffix = '', tone = 'blue', detail, icon }: { label: string, value: number, suffix?: string, tone?: string, detail: string, icon?: ReactNode }) {
  return <div className={`metric-card ${tone}`}><div className="metric-label">{icon}<span>{label}</span></div><div className="metric-value">{value}<small>{suffix}</small></div><div className="meter"><span style={{ width: `${Math.min(100, value)}%` }} /></div><p>{detail}</p></div>
}

export function EvidenceNotice({ children }: { children: ReactNode }) {
  return <div className="evidence-notice"><LockKeyhole size={18} /><div><b>Evidence boundary</b><p>{children}</p></div></div>
}

export function ScoreRing({ value, label, tone = 'blue' }: { value: number, label: string, tone?: string }) {
  return <div className={`score-ring ${tone}`} style={{ '--score': value } as React.CSSProperties}><div><strong>{value}</strong><small>/ 100</small></div><span>{label}</span></div>
}

export function EmptyCheck({ checked, children }: { checked: boolean, children: ReactNode }) {
  return <div className={checked ? 'check-item checked' : 'check-item'}>{checked ? <CircleCheck size={18} /> : <span className="empty-dot" />}{children}</div>
}
