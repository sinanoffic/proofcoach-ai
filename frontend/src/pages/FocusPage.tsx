import { AlertTriangle, BellOff, CheckCircle2, Maximize2, Pause, PhoneCall, Play, RotateCcw, Shield, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageIntro, Panel, StatusPill } from '../components/UI'

const FOCUS_KEY = 'proofcoach-focus-v1'
function savedFocus(): { demo: boolean, elapsed: number, ended: boolean } {
  try {
    const value = JSON.parse(localStorage.getItem(FOCUS_KEY) ?? '{}')
    return { demo: typeof value.demo === 'boolean' ? value.demo : true, elapsed: Number.isFinite(value.elapsed) && value.elapsed >= 0 ? value.elapsed : 0, ended: value.ended === true }
  } catch { return { demo: true, elapsed: 0, ended: false } }
}

export function FocusPage() {
  const navigate = useNavigate()
  const [saved] = useState(savedFocus)
  const [running, setRunning] = useState(false); const [demo, setDemo] = useState(saved.demo); const [elapsed, setElapsed] = useState(saved.elapsed); const [ended, setEnded] = useState(saved.ended); const [notice, setNotice] = useState(''); const limit = demo ? 20 : 150 * 60
  useEffect(() => { if (!running) return; const timer = window.setInterval(() => setElapsed(value => { if (value + 1 >= limit) { setRunning(false); setEnded(true); return limit } return value + 1 }), 1000); return () => clearInterval(timer) }, [running, limit])
  useEffect(() => { try { localStorage.setItem(FOCUS_KEY, JSON.stringify({ demo, elapsed, ended })) } catch { /* Storage may be unavailable. */ } }, [demo, elapsed, ended])
  const remaining = Math.max(0, limit - elapsed); const pct = Math.round((elapsed / limit) * 100)
  const reset = () => { setRunning(false); setElapsed(0); setEnded(false) }
  return <>
    <PageIntro kicker="FOCUS SHIELD" title="Protect the session. Respect the limit." actions={<button className="btn ghost" onClick={() => { setRunning(false); navigate('/learn') }}>Leave focus</button>}>The web app reduces in-app distractions, tracks active focus, and saves its timer state locally.</PageIntro>
    <div className="focus-grid">
      <Panel title="Active session" subtitle="Docker foundations → containerize FastAPI" action={<StatusPill state={running ? 'pass' : ended ? 'warn' : 'muted'}>{running ? 'FOCUSING' : ended ? 'LIMIT REACHED' : 'READY'}</StatusPill>}>
        <div className={`focus-clock ${running ? 'running' : ''}`} style={{ '--progress': pct } as React.CSSProperties}><div><small>{ended ? 'SESSION COMPLETE' : 'TIME REMAINING'}</small><b>{String(Math.floor(remaining / 60)).padStart(2, '0')}:{String(remaining % 60).padStart(2, '0')}</b><span>{demo ? 'compressed judge demo' : '2h 30m wellbeing limit'}</span></div></div>
        <div className="focus-controls"><button className="btn primary large" onClick={() => setRunning(!running)} disabled={ended}>{running ? <><Pause />Pause</> : <><Play />{elapsed ? 'Resume' : 'Start focus'}</>}</button><button className="btn outline" onClick={() => { setRunning(false); setEnded(true) }} disabled={ended}>Finish</button><button className="btn ghost" onClick={reset}><RotateCcw />Reset</button></div>
        <div className="switch-line"><span><b>Demo timer mode</b><small>Compress 2h30m to about 20 seconds for judges.</small></span><button type="button" className={demo ? 'switch on' : 'switch'} aria-label="Demo timer mode" aria-pressed={demo} onClick={() => { setDemo(!demo); reset() }}><i /></button></div>
        {ended && <div className="session-complete"><CheckCircle2 /><div><b>Progress autosaved. Intensive activity is paused.</b><p>Stand up, hydrate, and take a real break before the next session.</p></div></div>}
      </Panel>
      <div className="focus-side">
        <Panel title="Focus Mode behavior"><div className="feature-list"><span><Maximize2 /><div><b>Fullscreen-style workspace</b><small>Hides Phoenix navigation distractions</small></div><CheckCircle2 /></span><span><BellOff /><div><b>In-app notifications paused</b><small>Non-essential app alerts wait</small></div><CheckCircle2 /></span><span><Shield /><div><b>Local timer save</b><small>Timer state survives a page refresh</small></div><CheckCircle2 /></span></div></Panel>
        <Panel title="Emergency contact" subtitle="Simulation only; no call or message is sent."><div className="contact-row"><span>EC</span><div><b>Demo contact</b><small>Placeholder for future mobile integration</small></div><X aria-hidden="true" /></div><button className="btn outline wide" onClick={() => setNotice('Emergency contact simulation shown. No call or message was sent.')}><PhoneCall />Simulate emergency contact</button>{notice && <p className="role-message" role="status">{notice}</p>}</Panel>
        <div className="future-warning"><AlertTriangle /><div><b>Future Mobile Integration</b><p>A browser website cannot guarantee blocking WhatsApp, phone calls, or OS notifications. This prototype does not fake that capability.</p></div></div>
      </div>
    </div>
  </>
}
