import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronRight, FileSearch, Focus, Gauge, GitBranch,
  GraduationCap, LayoutDashboard, Menu, MessageSquareText, Settings, ShieldCheck,
  Sparkles, Swords, Target, Trophy, UserRound, Video, X, Beaker,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useProof } from '../context/ProofContext'
import { Brand } from './Brand'
import { ThemeToggle } from './ThemeToggle'

const primary = [
  ['/resume', 'Resume lab', FileSearch], ['/role', 'Target role', Target], ['/evidence', 'Evidence graph', GitBranch],
  ['/interview', 'Interview', MessageSquareText], ['/feedback', 'Feedback', Gauge],
] as const
const profile = [['/profile', 'Profile', UserRound]] as const
const growth = [
  ['/learn', 'Learning plan', GraduationCap], ['/video-plan', 'Video planner', Video],
  ['/project-lab', 'Project lab', Beaker],
  ['/quest', 'Career quest', Trophy], ['/focus', 'Focus shield', Focus],
] as const

function NavGroup({ label, items, close }: { label: string, items: readonly (readonly [string, string, typeof LayoutDashboard])[], close: () => void }) {
  return <div className="nav-group"><p>{label}</p>{items.map(([to, text, Icon]) =>
    <NavLink key={to} to={to} onClick={close} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
      <Icon size={18} /><span>{text}</span>{to === '/interview' && <i>LIVE</i>}
    </NavLink>)}</div>
}

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { state } = useProof()
  const focusing = location.pathname === '/focus'
  const titles: Record<string, string> = {
    '/profile': 'Profile', '/dashboard': 'Profile', '/resume': 'Resume lab', '/role': 'Target role', '/evidence': 'Career evidence',
    '/interview': 'Adaptive interview', '/feedback': 'Evidence feedback', '/learn': 'Learning plan', '/video-plan': 'Video study planner',
    '/project-lab': 'Project lab', '/quest': 'Career quest', '/focus': 'Focus shield', '/settings': 'Privacy & settings', '/onboarding': 'Private setup',
  }
  return <div className={focusing ? 'app-shell focus-shell' : 'app-shell'}>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    <aside className={open ? 'sidebar open' : 'sidebar'}>
      <Brand />
      <div className="mode-chip"><span /> Demo workspace</div>
      <nav>
        <NavGroup label="Your space" items={profile} close={() => setOpen(false)} />
        <NavGroup label="Workspace" items={primary} close={() => setOpen(false)} />
        <NavGroup label="Growth loop" items={growth} close={() => setOpen(false)} />
      </nav>
      <div className="sidebar-foot">
        <NavLink to="/settings" className="nav-link" onClick={() => setOpen(false)}><Settings size={18} /> Settings</NavLink>
        <div className="privacy-mini"><ShieldCheck size={16} /><span><b>Local-first</b><small>Your resume stays on this device.</small></span></div>
      </div>
    </aside>
    <main className="main-shell">
      <header className="topbar">
        <div><span className="eyebrow"><Sparkles size={13} /> PROOFCOACH WORKSPACE</span><h1>{titles[location.pathname] || 'ProofCoach AI'}</h1></div>
        <div className="top-actions">
          <span className="top-local"><ShieldCheck size={15} />Local-first</span>
          <span className="top-demo">DEMO</span>
          <ThemeToggle />
          {!focusing && <button className="btn ghost top-practice" onClick={() => navigate('/interview')}><Swords size={17} /> Practice</button>}
          <button className="avatar" onClick={() => navigate('/profile')} title="Profile" aria-label="Open profile">{state.candidate.name?.slice(0, 1).toUpperCase() || 'P'}</button>
        </div>
      </header>
      <AnimatePresence mode="wait"><motion.div key={location.pathname} className="page" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}>{children}</motion.div></AnimatePresence>
    </main>
  </div>
}

export function DemoPath({ to, label = 'Continue demo' }: { to: string, label?: string }) {
  const navigate = useNavigate()
  return <button className="btn primary" onClick={() => navigate(to)}>{label}<ChevronRight size={17} /></button>
}
