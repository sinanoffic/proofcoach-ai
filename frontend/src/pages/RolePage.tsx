import { BriefcaseBusiness, Check, ClipboardPaste, Search, Target, X } from 'lucide-react'
import { useState } from 'react'
import { DemoPath } from '../components/Shell'
import { PageIntro, Panel, StatusPill } from '../components/UI'
import { skillEvidence } from '../data/demo'
import { apiFetch } from '../services/api'

const roles = ['Backend Developer', 'Frontend Developer', 'Machine Learning Engineer', 'Data Analyst', 'Software Engineer']

export function RolePage() {
  const [role, setRole] = useState('Backend Developer'); const [description, setDescription] = useState('Entry-level Backend Developer. Required: Python, REST, SQL, Docker, Testing, and basic System Design. Build maintainable APIs, explain technical trade-offs, and diagnose failures.')
  const [analysis, setAnalysis] = useState<{ role: string, required_skills: string[], experience_requirement: string } | null>(null)
  const [message, setMessage] = useState('')
  const analyze = async () => {
    try { const result = await apiFetch<{ role: string, required_skills: string[], experience_requirement: string }>('/api/role/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role, job_description: description }) }); setAnalysis(result); setMessage('Requirements extracted by the local backend.') }
    catch { setAnalysis(null); setMessage('Local backend unavailable. Showing the seeded Backend Developer example; custom description was not analyzed.') }
  }
  const requirements = analysis ? analysis.required_skills.map(skill => skillEvidence.find(item => item.skill.toLowerCase() === skill.toLowerCase()) ?? { skill, status: 'missing', note: 'No resume evidence found' }) : skillEvidence
  const covered = requirements.filter(item => item.status === 'strong' || item.status === 'evidence' || item.status === 'partial').length
  return <>
    <PageIntro kicker="STEP 02 · TARGET ROLE" title="Translate the job into evidence requirements.">Choose a demo role or paste a description. Phoenix separates required skills, preferred skills, responsibilities, and competencies.</PageIntro>
    <div className="role-grid">
      <Panel title="Target input" subtitle="Demo role or pasted job description.">
        <label className="search-select"><Search /><select value={role} onChange={e => setRole(e.target.value)}>{roles.map(item => <option key={item}>{item}</option>)}</select></label>
        <div className="or-divider"><span>OR PASTE A JOB DESCRIPTION</span></div>
        <label className="textarea-label"><ClipboardPaste /><textarea value={description} onChange={e => setDescription(e.target.value)} rows={9} /><small>{description.length} characters · processed locally</small></label>
        <button className="btn primary wide" onClick={analyze}><Target size={17} /> Analyze requirements</button>
        {message && <p className="role-message" role="status">{message}</p>}
      </Panel>
      <Panel title={analysis?.role ?? 'Backend Developer'} subtitle={analysis ? 'Locally extracted role requirements' : 'Seeded example · analyze for your role'} action={<StatusPill state={analysis ? 'pass' : 'info'}>{analysis ? 'LOCAL ANALYSIS' : 'DEMO ROLE'}</StatusPill>}>
        <div className="role-meta"><span><BriefcaseBusiness />Experience<strong>Entry level / projects accepted</strong></span><span><Target />Competency<strong>Ownership + trade-offs</strong></span></div>
        <h4 className="section-label">Required skills</h4>
        <div className="requirement-grid">{requirements.map(item => <div key={item.skill} className={`requirement ${item.status}`}><span>{item.status === 'missing' ? <X /> : <Check />}</span><div><b>{item.skill}</b><small>{item.note}</small></div><i>{item.status}</i></div>)}</div>
        <div className="coverage-summary"><div><span>Required skills covered</span><b>{covered} <small>/ {requirements.length}</small></b></div><div><span>Strongest evidence</span><b className="green-text">Python</b></div><div><span>Priority gap</span><b className="red-text">{requirements.find(item => item.status === 'missing')?.skill ?? 'None'}</b></div></div>
      </Panel>
    </div>
    <div className="page-continue"><span>Next: inspect the links—and the missing links—behind each claim.</span><DemoPath to="/evidence" label="Build evidence graph" /></div>
  </>
}
