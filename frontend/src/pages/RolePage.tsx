import { BriefcaseBusiness, Check, ClipboardPaste, Search, Target, X } from 'lucide-react'
import { useState } from 'react'
import { DemoPath } from '../components/Shell'
import { PageIntro, Panel, StatusPill } from '../components/UI'
import { skillEvidence } from '../data/demo'

const roles = ['Backend Developer', 'Frontend Developer', 'Machine Learning Engineer', 'Data Analyst', 'Software Engineer']

export function RolePage() {
  const [role, setRole] = useState('Backend Developer'); const [description, setDescription] = useState('Entry-level Backend Developer. Required: Python, REST, SQL, Docker, Testing, and basic System Design. Build maintainable APIs, explain technical trade-offs, and diagnose failures.')
  return <>
    <PageIntro kicker="STEP 02 · TARGET ROLE" title="Translate the job into evidence requirements.">Choose a demo role or paste a description. ProofCoach separates required skills, preferred skills, responsibilities, and competencies.</PageIntro>
    <div className="role-grid">
      <Panel title="Target input" subtitle="Demo role or pasted job description.">
        <label className="search-select"><Search /><select value={role} onChange={e => setRole(e.target.value)}>{roles.map(item => <option key={item}>{item}</option>)}</select></label>
        <div className="or-divider"><span>OR PASTE A JOB DESCRIPTION</span></div>
        <label className="textarea-label"><ClipboardPaste /><textarea value={description} onChange={e => setDescription(e.target.value)} rows={9} /><small>{description.length} characters · processed locally</small></label>
        <button className="btn primary wide"><Target size={17} /> Analyze requirements</button>
      </Panel>
      <Panel title={role} subtitle="Extracted role evidence model" action={<StatusPill state="pass">DEMO ROLE</StatusPill>}>
        <div className="role-meta"><span><BriefcaseBusiness />Experience<strong>Entry level / projects accepted</strong></span><span><Target />Competency<strong>Ownership + trade-offs</strong></span></div>
        <h4 className="section-label">Required skills</h4>
        <div className="requirement-grid">{skillEvidence.map(item => <div key={item.skill} className={`requirement ${item.status}`}><span>{item.status === 'missing' ? <X /> : <Check />}</span><div><b>{item.skill}</b><small>{item.note}</small></div><i>{item.status}</i></div>)}</div>
        <div className="coverage-summary"><div><span>Required skills covered</span><b>3 <small>/ 6</small></b></div><div><span>Strongest evidence</span><b className="green-text">Python</b></div><div><span>Weakest evidence</span><b className="red-text">Docker</b></div></div>
      </Panel>
    </div>
    <div className="page-continue"><span>Next: inspect the links—and the missing links—behind each claim.</span><DemoPath to="/evidence" label="Build evidence graph" /></div>
  </>
}

