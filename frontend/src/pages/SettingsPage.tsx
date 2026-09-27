import { Database, Download, LockKeyhole, Moon, RefreshCw, ShieldCheck, Sun, Trash2, WifiOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageIntro, Panel, StatusPill } from '../components/UI'
import { useProof } from '../context/ProofContext'
import { deleteBackendData } from '../services/api'
import { useTheme } from '../context/ThemeContext'

export function SettingsPage() {
  const { state, resetDemo, deleteLocalData } = useProof(); const { theme, toggleTheme } = useTheme(); const navigate = useNavigate(); const [confirming, setConfirming] = useState(false); const [message, setMessage] = useState('')
  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob); const link = document.createElement('a')
    link.href = url; link.download = 'proofcoach-progress.json'; link.click(); URL.revokeObjectURL(url)
  }
  const remove = async () => { await deleteBackendData(); deleteLocalData(); setConfirming(false); setMessage('Profile, resume, interview transcript, and browser demo state deleted.'); navigate('/') }
  return <>
    <PageIntro kicker="PRIVACY & SETTINGS" title="Your evidence stays under your control.">The prototype defaults to localhost, local SQLite, and deterministic demo mode.</PageIntro>
    <div className="settings-grid">
      <Panel title="Appearance" subtitle="Your preference is saved on this browser."><div className="appearance-options"><button className={theme === 'dark' ? 'selected' : ''} onClick={() => theme !== 'dark' && toggleTheme()} aria-pressed={theme === 'dark'}><Moon /><b>Dark</b><small>Quiet, focused workspace</small></button><button className={theme === 'light' ? 'selected' : ''} onClick={() => theme !== 'light' && toggleTheme()} aria-pressed={theme === 'light'}><Sun /><b>Light</b><small>Clear editorial workspace</small></button></div></Panel>
      <Panel title="Interview & focus" subtitle="Adjust your pace and interviewer preference."><div className="settings-list"><span><ShieldCheck /><div><b>{state.candidate.interviewMode} interview · {state.candidate.interviewerPersona}</b><small>Preference is voluntary and changeable</small></div></span><span><WifiOff /><div><b>{state.candidate.dailyMinutes} minutes / day</b><small>Wellbeing limit and demo timer available in Focus Shield</small></div></span></div><button className="btn outline wide" onClick={() => navigate('/onboarding')}>Edit practice preferences</button></Panel>
      <Panel title="Runtime" subtitle="Clear labels for what is real and what is simulated."><div className="settings-list"><span><WifiOff /><div><b>Demo mode</b><small>Complete deterministic flow without Ollama</small></div><StatusPill state="pass">ACTIVE</StatusPill></span><span><Database /><div><b>Local SQLite</b><small>Available when FastAPI runs on your device</small></div><StatusPill state="muted">DEV ONLY</StatusPill></span><span><LockKeyhole /><div><b>Resume analytics</b><small>No analytics SDK; resume content is not sent</small></div><StatusPill state="pass">OFF</StatusPill></span></div></Panel>
      <Panel title="Data controls" subtitle="Export or remove local prototype data."><div className="data-actions"><button className="btn outline wide" onClick={exportProgress}><Download />Export my progress <small>JSON</small></button><button className="btn outline wide" onClick={resetDemo}><RefreshCw />Reset deterministic demo</button><button className="btn danger wide" onClick={() => setConfirming(true)}><Trash2 />Delete my data</button></div>{message && <p className="success-message"><ShieldCheck />{message}</p>}</Panel>
      <Panel title="Privacy inventory" subtitle="Exactly what the prototype may retain locally."><div className="inventory"><span><b>Candidate profile</b><small>Name, category, education, role preferences</small></span><span><b>Resume record</b><small>Filename, extracted text, transparent parser analysis</small></span><span><b>Interview transcript</b><small>Questions, text answers, evidence feedback</small></span><span><b>Not collected</b><small>Photo, facial data, inferred gender, analytics identifiers</small></span></div></Panel>
      <Panel title="AI provider" subtitle="Local abstraction with safe fallback."><div className="provider-box"><span>DEMO</span><div><b>Deterministic AIProvider</b><small>Seeded, repeatable, judge-safe</small></div><StatusPill state="pass">CONNECTED</StatusPill></div><div className="provider-box disabled"><span>OL</span><div><b>Ollama</b><small>Optional · configure in .env</small></div><StatusPill state="muted">OFFLINE</StatusPill></div></Panel>
    </div>
    {confirming && <div className="modal-backdrop" role="presentation"><div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><span className="danger-icon"><Trash2 /></span><h3 id="delete-title">Delete all local candidate data?</h3><p>This removes the profile, resume record, interview transcript, and browser demo state. The application files remain installed.</p><div><button className="btn ghost" onClick={() => setConfirming(false)}>Cancel</button><button className="btn danger" onClick={remove}>Delete my data</button></div></div></div>}
  </>
}
