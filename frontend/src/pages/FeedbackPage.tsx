import { AlertTriangle, ArrowRight, Check, LockKeyhole, ShieldCheck, TrendingUp, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts'
import { EvidenceNotice, PageIntro, Panel, ScoreRing } from '../components/UI'
import { useProof } from '../context/ProofContext'
import { useTheme } from '../context/ThemeContext'

export function FeedbackPage() {
  const { state, setEvidenceLockDemo } = useProof(); const { theme } = useTheme(); const nav = useNavigate()
  
  const evalData = state.evaluation || {
    dimensions: { baseline: 'yes', measurement: 'partial', personal_contribution: 'yes', trade_offs: 'weak', scaling_knowledge: 'weak' },
    scores: { technical_fundamentals: 74, problem_solving: 76, project_ownership: 82, communication_clarity: 76, evidence_impact: 82, learning_ability: 72 },
    claim_confidence_before: 58, claim_confidence_after: 82,
    evidence_note: 'This increase means the candidate demonstrated stronger understanding during the interview. It does not independently prove that the real-world claim is true.',
    feedback: 'Run a documented benchmark using a fixed sample, record p50/p95, then explain cache invalidation and memory cost.'
  }

  const radar = [
    { metric: 'Fundamentals', score: evalData.scores.technical_fundamentals },
    { metric: 'Problem solving', score: evalData.scores.problem_solving },
    { metric: 'Ownership', score: evalData.scores.project_ownership },
    { metric: 'Communication', score: evalData.scores.communication_clarity },
    { metric: 'Evidence', score: evalData.scores.evidence_impact },
    { metric: 'Learning', score: evalData.scores.learning_ability }
  ]

  const formatDimension = (val: string) => val.toUpperCase()
  const stateMap = (val: string) => val === 'yes' ? 'pass' : val === 'partial' ? 'warn' : 'danger'

  const checks = [
    { label: 'Baseline explained', value: formatDimension(evalData.dimensions.baseline), state: stateMap(evalData.dimensions.baseline) },
    { label: 'Measurement explained', value: formatDimension(evalData.dimensions.measurement), state: stateMap(evalData.dimensions.measurement) },
    { label: 'Personal contribution', value: formatDimension(evalData.dimensions.personal_contribution), state: stateMap(evalData.dimensions.personal_contribution) },
    { label: 'Trade-offs', value: formatDimension(evalData.dimensions.trade_offs), state: stateMap(evalData.dimensions.trade_offs) },
    { label: 'Scaling knowledge', value: formatDimension(evalData.dimensions.scaling_knowledge), state: stateMap(evalData.dimensions.scaling_knowledge) }
  ]

  return <>
    <PageIntro kicker="STEP 05 · EVIDENCE FEEDBACK" title="Your claim is clearer. The weak links are now specific.">Feedback references the answer you gave and separates demonstrated understanding from external truth.</PageIntro>
    <div className="feedback-top">
      <Panel title="Claim truth loop" subtitle="Interview evidence changed demonstrated confidence.">
        <div className="truth-loop"><div><ScoreRing value={evalData.claim_confidence_before} label="Before interview" tone="amber" /><ArrowRight /><ScoreRing value={evalData.claim_confidence_after} label="After interview" tone="green" /></div><blockquote>“Reduced API latency by 35%.”</blockquote><div className="evidence-checks">{checks.map(item => <span key={item.label}><i className={item.state}>{item.state === 'pass' ? <Check /> : item.state === 'warn' ? <AlertTriangle /> : <X />}</i><b>{item.label}</b><em className={item.state}>{item.value}</em></span>)}</div></div>
      </Panel>
      <Panel title="Interview readiness" subtitle="Six separate evidence dimensions.">
        <div className="radar-wrap"><ResponsiveContainer width="100%" height={285}><RadarChart data={radar}><PolarGrid stroke={theme === 'light' ? '#dfe6ef' : '#34445b'} /><PolarAngleAxis dataKey="metric" tick={{ fill: theme === 'light' ? '#49566a' : '#a8b7ca', fontSize: 12 }} /><Radar dataKey="score" stroke={theme === 'light' ? '#1769ff' : '#27c4ff'} fill={theme === 'light' ? '#1769ff' : '#1877ff'} fillOpacity={.18} /></RadarChart></ResponsiveContainer><div className="radar-score"><b>{evalData.scores.evidence_impact}</b><small>/100</small></div></div>
      </Panel>
    </div>
    <EvidenceNotice>{evalData.evidence_note}</EvidenceNotice>
    <div className="feedback-grid">
      <Panel title="Evidence from your answer" subtitle="Quoted from your submitted response.">
        <div className="quote-evidence"><blockquote>“...{state.answer ? state.answer.substring(0, 150) + '...' : 'Demo response used.'}”</blockquote></div>
      </Panel>
      <Panel title="Evidence Lock" subtitle="Improve the wording without manufacturing achievement.">
        <div className="rewrite-box"><small>ORIGINAL</small><p>Made API faster.</p></div>
        <button className="rewrite-option safe" onClick={() => setEvidenceLockDemo('safe')}><ShieldCheck /><span><b>Optimized API response performance.</b><small>Grammar and clarity only</small></span><i>SAFE</i></button>
        <button className="rewrite-option blocked" onClick={() => setEvidenceLockDemo('blocked')}><LockKeyhole /><span><b>Reduced API latency by 40%.</b><small>40% is not supported</small></span><i>BLOCK</i></button>
        {state.evidenceLockDemo !== 'idle' && <div className={`lock-result ${state.evidenceLockDemo}`}>{state.evidenceLockDemo === 'safe' ? <><Check />Safe rewrite: no new fact was added.</> : <><X />Evidence Lock prevented an unsupported achievement from being added.</>}</div>}
      </Panel>
    </div>
    <div className="coaching-callout"><TrendingUp /><div><b>Best next move</b><p>Run a documented benchmark using a fixed sample, record p50/p95, then explain cache invalidation and memory cost.</p></div><button className="btn primary" onClick={() => nav('/learn')}>Build learning plan</button></div>
  </>
}
