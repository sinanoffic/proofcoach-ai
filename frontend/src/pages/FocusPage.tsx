import { AlertTriangle, BellOff, CheckCircle2, Maximize2, Pause, PhoneCall, Play, RotateCcw, Shield, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PageIntro, Panel, StatusPill } from '../components/UI'

export function FocusPage() {
  const [running, setRunning] = useState(false); const [demo, setDemo] = useState(true); const [elapsed, setElapsed] = useState(0); const [ended, setEnded] = useState(false); const limit = demo ? 20 : 150 * 60
  useEffect(() => { if (!running) return; const timer = window.setInterval(() => setElapsed(value => { if (value + 1 >= limit) { setRunning(false); setEnded(true); return limit } return value + 1 }), 1000); return () => clearInterval(timer) }, [running, limit])
  const remaining = Math.max(0, limit - elapsed); const pct = Math.round((elapsed / limit) * 100)
  const reset = () => { setRunning(false); setElapsed(0); setEnded(false) }
  return <>
    <PageIntro kicker="FOCUS SHIELD" title="Protect the session. Respect the limit.">The web app reduces in-app distractions, tracks active focus, and autosaves at the wellbeing limit.</PageIntro>
    <div className="focus-grid">
      <Panel title="Active session" subtitle="Docker foundations → containerize FastAPI" action={<StatusPill state={running ? 'pass' : ended ? 'warn' : 'muted'}>{running ? 'FOCUSING' : ended ? 'LIMIT REACHED' : 'READY'}</StatusPill>}>
        <div className={`focus-clock ${running ? 'running' : ''}`} style={{ '--progress': pct } as React.CSSProperties}><div><small>{ended ? 'SESSION COMPLETE' : 'TIME REMAINING'}</small><b>{String(Math.floor(remaining / 60)).padStart(2, '0')}:{String(remaining % 60).padStart(2, '0')}</b><span>{demo ? 'compressed judge demo' : '2h 30m wellbeing limit'}</span></div></div>
        <div className="focus-controls"><button className="btn primary large" onClick={() => setRunning(!running)} disabled={ended}>{running ? <><Pause />Pause</> : <><Play />{elapsed ? 'Resume' : 'Start focus'}</>}</button><button className="btn outline" onClick={reset}><RotateCcw />Reset</button></div>
        <label className="switch-line"><span><b>Demo timer mode</b><small>Compress 2h30m to about 20 seconds for judges.</small></span><button className={demo ? 'switch on' : 'switch'} onClick={() => { setDemo(!demo); reset() }}><i /></button></label>
        {ended && <div className="session-complete"><CheckCircle2 /><div><b>Progress autosaved. Intensive activity is paused.</b><p>Stand up, hydrate, and take a real break before the next session.</p></div></div>}
      </Panel>
      <div className="focus-side">
        <Panel title="Focus Mode behavior"><div className="feature-list"><span><Maximize2 /><div><b>Fullscreen-style workspace</b><small>Hides ProofCoach navigation distractions</small></div><CheckCircle2 /></span><span><BellOff /><div><b>In-app notifications paused</b><small>Non-essential app alerts wait</small></div><CheckCircle2 /></span><span><Shield /><div><b>Continuous autosave</b><small>Answer and task state stays recoverable</small></div><CheckCircle2 /></span></div></Panel>
        <Panel title="Emergency contacts" subtitle="1–5 trusted contacts for future mobile integration."><div className="contact-row"><span>AM</span><div><b>Emergency contact 1</b><small>Demo-only placeholder</small></div><button><X /></button></div><button className="btn outline wide"><PhoneCall />Simulate emergency contact</button></Panel>
        <div className="future-warning"><AlertTriangle /><div><b>Future Mobile Integration</b><p>A browser website cannot guarantee blocking WhatsApp, phone calls, or OS notifications. This prototype does not fake that capability.</p></div></div>
      </div>
    </div>
  </>
}
