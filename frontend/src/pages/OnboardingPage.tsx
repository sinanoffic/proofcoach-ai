import { ShieldCheck, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageIntro, Panel } from '../components/UI'
import { useProof } from '../context/ProofContext'
import type { Candidate } from '../types'

export function OnboardingPage() {
  const { state, updateCandidate, complete } = useProof(); const navigate = useNavigate()
  const c = state.candidate
  const update = (key: keyof Candidate, value: string | number) => updateCandidate({ [key]: value })
  const submit = (event: React.FormEvent) => { event.preventDefault(); complete('onboarding'); navigate('/dashboard') }
  return <>
    <PageIntro kicker="PRIVATE SETUP" title="Shape your preparation around the role.">Nothing here is used to infer your identity. Interviewer preferences are always voluntary and changeable.</PageIntro>
    <form className="onboarding-grid" onSubmit={submit}>
      <Panel title="Candidate profile" subtitle="The minimum context needed for relevant feedback.">
        <div className="form-grid">
          <label className="span-2">Name<input value={c.name} onChange={e => update('name', e.target.value)} placeholder="Your name" required /></label>
          <label>Candidate category<select value={c.category} onChange={e => update('category', e.target.value)}><option>Student</option><option>Fresher</option><option>Early-career professional</option><option>Career switcher</option></select></label>
          <label>Education<input value={c.education} onChange={e => update('education', e.target.value)} /></label>
          <label>Experience / year<input value={c.experience} onChange={e => update('experience', e.target.value)} /></label>
          <label>Target career<input value={c.targetCareer} onChange={e => update('targetCareer', e.target.value)} /></label>
          <label>Target role<select value={c.targetRole} onChange={e => update('targetRole', e.target.value)}><option>Backend Developer</option><option>Frontend Developer</option><option>Machine Learning Engineer</option><option>Data Analyst</option><option>Software Engineer</option></select></label>
          <label>Target company <small>optional</small><input value={c.targetCompany} onChange={e => update('targetCompany', e.target.value)} placeholder="Leave blank for role-wide prep" /></label>
        </div>
      </Panel>
      <Panel title="Practice preferences" subtitle="You stay in control of mode, pace, and persona.">
        <div className="form-stack">
          <label>Daily preparation time <b>{Math.floor(c.dailyMinutes / 60)}h {c.dailyMinutes % 60}m</b><input type="range" min="120" max="180" step="15" value={c.dailyMinutes} onChange={e => update('dailyMinutes', Number(e.target.value))} /></label>
          <fieldset><legend>Interview mode</legend><div className="segmented">{['Text', 'Voice'].map(item => <button type="button" key={item} className={c.interviewMode === item ? 'selected' : ''} onClick={() => update('interviewMode', item)}>{item}</button>)}</div></fieldset>
          <label>Interviewer preference<select value={c.interviewerPersona} onChange={e => update('interviewerPersona', e.target.value)}><option>Female AI interviewer</option><option>Male AI interviewer</option><option>Neutral</option><option>Auto Pair</option></select></label>
          {c.interviewerPersona === 'Auto Pair' && <label>Gender <small>optional; never inferred</small><select value={c.voluntaryGender} onChange={e => update('voluntaryGender', e.target.value)}><option value="">Prefer not to say</option><option>Woman</option><option>Man</option><option>Non-binary</option></select></label>}
          <div className="privacy-box"><ShieldCheck /><span><b>No gender inference</b><small>Never inferred from name, resume, photo, voice, or appearance.</small></span></div>
        </div>
      </Panel>
      <div className="form-footer"><span><Sparkles size={17} /> You can change every preference later.</span><button className="btn primary" type="submit">Create private workspace</button></div>
    </form>
  </>
}

