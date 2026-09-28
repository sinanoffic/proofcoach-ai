import { ArrowRight, Pencil, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageIntro, Panel } from '../components/UI'
import { useProof } from '../context/ProofContext'
import { DashboardPage } from './DashboardPage'

function Detail({ label, value, note }: { label: string, value: string, note?: string }) {
  return <div className="profile-detail"><dt>{label}</dt><dd>{value || 'Not provided'}</dd>{note && <small>{note}</small>}</div>
}

export function ProfilePage() {
  const { state } = useProof()
  const navigate = useNavigate()
  const candidate = state.candidate
  const minutes = candidate.dailyMinutes
  const dailyTime = `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m per day`

  return <>
    <PageIntro kicker="YOUR PRIVATE SPACE" title="Profile & command centre" actions={<button className="btn outline" onClick={() => navigate('/onboarding')}><Pencil /> Edit details</button>}>
      Your career context and preparation progress in one place. Details below come from your onboarding choices.
    </PageIntro>

    <section className="profile-hero" aria-label="Candidate profile overview">
      <div className="profile-identity"><span className="profile-monogram" aria-hidden="true">{candidate.name?.trim().slice(0, 1).toUpperCase() || 'P'}</span><div><span className="eyebrow">CANDIDATE PROFILE</span><h3>{candidate.name || 'Your profile'}</h3><p>{candidate.category} · Preparing for {candidate.targetRole}</p></div></div>
      <span className="profile-private"><ShieldCheck size={17} /> Private workspace</span>
    </section>

    <div className="profile-details-grid">
      <Panel title="Career details" subtitle="The information you chose to share for role analysis.">
        <dl className="profile-detail-list">
          <Detail label="Name" value={candidate.name} />
          <Detail label="Candidate category" value={candidate.category} />
          <Detail label="Education" value={candidate.education} />
          <Detail label="Experience / year" value={candidate.experience} />
          <Detail label="Target career" value={candidate.targetCareer} />
          <Detail label="Target role" value={candidate.targetRole} />
          <Detail label="Target company" value={candidate.targetCompany} />
        </dl>
      </Panel>
      <Panel title="Practice preferences" subtitle="Change these whenever your preparation changes.">
        <dl className="profile-detail-list">
          <Detail label="Daily preparation" value={dailyTime} />
          <Detail label="Interview mode" value={`${candidate.interviewMode} interview`} />
          <Detail label="Interviewer" value={candidate.interviewerPersona} />
          {candidate.interviewerPersona === 'Auto Pair' && candidate.voluntaryGender && <Detail label="Gender" value={candidate.voluntaryGender} note="Voluntarily provided; never inferred" />}
        </dl>
        <button className="text-link profile-edit-link" onClick={() => navigate('/onboarding')}>Update profile and preferences <ArrowRight size={16} /></button>
      </Panel>
    </div>

    <section className="profile-command-centre" aria-label="Command centre"><DashboardPage /></section>
  </>
}
