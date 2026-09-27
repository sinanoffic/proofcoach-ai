import { AlertTriangle, ArrowRight, Check, LockKeyhole, ShieldCheck, TrendingUp, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts'
import { EvidenceNotice, PageIntro, Panel, ScoreRing, StatusPill } from '../components/UI'
import { useProof } from '../context/ProofContext'

const radar = [{ metric: 'Fundamentals', score: 74 }, { metric: 'Problem solving', score: 76 }, { metric: 'Ownership', score: 82 }, { metric: 'Communication', score: 76 }, { metric: 'Evidence', score: 82 }, { metric: 'Learning', score: 72 }]
const checks = [{ label: 'Baseline explained', value: 'YES', state: 'pass' }, { label: 'Measurement explained', value: 'PARTIAL', state: 'warn' }, { label: 'Personal contribution', value: 'YES', state: 'pass' }, { label: 'Trade-offs', value: 'WEAK', state: 'danger' }, { label: 'Scaling knowledge', value: 'WEAK', state: 'danger' }]

export function FeedbackPage() {
  const { state, setEvidenceLockDemo } = useProof(); const nav = useNavigate()
  return <>
    <PageIntro kicker="STEP 05 · EVIDENCE FEEDBACK" title="Your claim is clearer. The weak links are now specific.">Feedback references the answer you gave and separates demonstrated understanding from external truth.</PageIntro>
    <div className="feedback-top">
      <Panel title="Claim truth loop" subtitle="Interview evidence changed demonstrated confidence.">
        <div className="truth-loop"><div><ScoreRing value={58} label="Before interview" tone="amber" /><ArrowRight /><ScoreRing value={82} label="After interview" tone="green" /></div><blockquote>“Reduced API latency by 35%.”</blockquote><div className="evidence-checks">{checks.map(item => <span key={item.label}><i className={item.state}>{item.state === 'pass' ? <Check /> : item.state === 'warn' ? <AlertTriangle /> : <X />}</i><b>{item.label}</b><em className={item.state}>{item.value}</em></span>)}</div></div>
      </Panel>
      <Panel title="Interview readiness" subtitle="Six separate evidence dimensions.">
        <div className="radar-wrap"><ResponsiveContainer width="100%" height={285}><RadarChart data={radar}><PolarGrid stroke="#203552" /><PolarAngleAxis dataKey="metric" tick={{ fill: '#9aa9bf', fontSize: 11 }} /><Radar dataKey="score" stroke="#00bfff" fill="#006bff" fillOpacity={.28} /></RadarChart></ResponsiveContainer><div className="radar-score"><b>76</b><small>/100</small></div></div>
      </Panel>
    </div>
    <EvidenceNotice>This increase means the candidate demonstrated stronger understanding during the interview. It does not independently prove that the real-world 35% claim is true.</EvidenceNotice>
    <div className="feedback-grid">
      <Panel title="Evidence from your answer" subtitle="Quoted from the seeded response.">
        <div className="quote-evidence"><blockquote>“The original endpoint averaged about <mark>420 ms</mark> before my change and around <mark>273 ms</mark> after it.”</blockquote><span><StatusPill state="pass">BASELINE</StatusPill><StatusPill state="pass">MEASUREMENT VALUE</StatusPill></span><blockquote>“I measured several runs using Postman… but I did not preserve the full test sample or p95 results.”</blockquote><span><StatusPill state="warn">HONEST LIMIT</StatusPill><StatusPill state="warn">METHOD PARTIAL</StatusPill></span></div>
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

