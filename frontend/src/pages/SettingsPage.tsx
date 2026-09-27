import { Database, Download, LockKeyhole, RefreshCw, ShieldCheck, Trash2, WifiOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageIntro, Panel, StatusPill } from '../components/UI'
import { useProof } from '../context/ProofContext'
import { deleteBackendData } from '../services/api'

export function SettingsPage() {
  const { resetDemo, deleteLocalData } = useProof(); const navigate = useNavigate(); const [confirming, setConfirming] = useState(false); const [message, setMessage] = useState('')
  const remove = async () => { await deleteBackendData(); deleteLocalData(); setConfirming(false); setMessage('Profile, resume, interview transcript, and browser demo state deleted.'); navigate('/') }
  return <>
    <PageIntro kicker="PRIVACY & SETTINGS" title="Your evidence stays under your control.">The prototype defaults to localhost, local SQLite, and deterministic demo mode.</PageIntro>
    <div className="settings-grid">
      <Panel title="Runtime" subtitle="Clear labels for what is real and what is simulated."><div className="settings-list"><span><WifiOff /><div><b>Demo mode</b><small>Complete deterministic flow without Ollama</small></div><StatusPill state="pass">ACTIVE</StatusPill></span><span><Database /><div><b>Local SQLite</b><small>Profile, extracted text, interview state</small></div><StatusPill state="pass">LOCAL</StatusPill></span><span><LockKeyhole /><div><b>Resume analytics</b><small>No analytics SDK; resume content is not sent</small></div><StatusPill state="pass">OFF</StatusPill></span></div></Panel>
      <Panel title="Data controls" subtitle="Export or remove local prototype data."><div className="data-actions"><button className="btn outline wide"><Download />Export my progress <small>JSON</small></button><button className="btn outline wide" onClick={resetDemo}><RefreshCw />Reset deterministic demo</button><button className="btn danger wide" onClick={() => setConfirming(true)}><Trash2 />Delete my data</button></div>{message && <p className="success-message"><ShieldCheck />{message}</p>}</Panel>
      <Panel title="Privacy inventory" subtitle="Exactly what the prototype may retain locally."><div className="inventory"><span><b>Candidate profile</b><small>Name, category, education, role preferences</small></span><span><b>Resume record</b><small>Filename, extracted text, transparent parser analysis</small></span><span><b>Interview transcript</b><small>Questions, text answers, evidence feedback</small></span><span><b>Not collected</b><small>Photo, facial data, inferred gender, analytics identifiers</small></span></div></Panel>
      <Panel title="AI provider" subtitle="Local abstraction with safe fallback."><div className="provider-box"><span>DEMO</span><div><b>Deterministic AIProvider</b><small>Seeded, repeatable, judge-safe</small></div><StatusPill state="pass">CONNECTED</StatusPill></div><div className="provider-box disabled"><span>OL</span><div><b>Ollama</b><small>Optional · configure in .env</small></div><StatusPill state="muted">OFFLINE</StatusPill></div></Panel>
    </div>
    {confirming && <div className="modal-backdrop" role="presentation"><div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="delete-title"><span className="danger-icon"><Trash2 /></span><h3 id="delete-title">Delete all local candidate data?</h3><p>This removes the profile, resume record, interview transcript, and browser demo state. The application files remain installed.</p><div><button className="btn ghost" onClick={() => setConfirming(false)}>Cancel</button><button className="btn danger" onClick={remove}>Delete my data</button></div></div></div>}
  </>
}

