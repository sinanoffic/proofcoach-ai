import { Check, ChevronRight, Crown, LockKeyhole, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageIntro, Panel, StatusPill } from '../components/UI'
import { questLevels } from '../data/demo'
import { useProof } from '../context/ProofContext'

export function QuestPage() {
  const { state } = useProof(); const nav = useNavigate()
  return <>
    <PageIntro kicker="CAREER QUEST" title="Three levels. One growth path.">Points reward verified progress, practice, and stronger evidence—not screen time or empty activity.</PageIntro>
    <div className="quest-banner"><img src="/assets/phoenix-watermark.jpg" alt="" /><div><span>PHOENIX CAREER QUEST</span><h2>{state.metrics.questPoints} <small>EVIDENCE XP</small></h2><p>Next milestone: complete your first gap artifact</p><i><b style={{ width: `${state.metrics.questPoints / 4}%` }} /></i></div><div className="quest-rank"><Crown /><b>PATHFINDER</b><small>Level 2</small></div></div>
    <div className="quest-levels">{questLevels.map(level => <Panel key={level.level} className={`quest-card ${level.status}`}>
      <div className="quest-card-top"><span className="level-number">{level.status === 'complete' ? <Check /> : level.status === 'locked' ? <LockKeyhole /> : level.level}</span><div><small>LEVEL {level.level}</small><h3>{level.name}</h3><p>{level.subtitle}</p></div><StatusPill state={level.status === 'complete' ? 'pass' : level.status === 'active' ? 'info' : 'muted'}>{level.status.toUpperCase()}</StatusPill></div>
      <div className="quest-items">{level.items.map((item, index) => <span key={item} className={level.status === 'complete' || level.status === 'active' && index === 0 ? 'done' : ''}>{level.status === 'complete' || level.status === 'active' && index === 0 ? <Check /> : <i />}{item}</span>)}</div>
      <div className="quest-card-foot"><b>{level.points} XP earned</b>{level.status === 'active' && <button onClick={() => nav('/learn')}>Continue <ChevronRight /></button>}</div>
    </Panel>)}</div>
    <Panel title="Point rules" subtitle="Transparent, action-linked rewards."><div className="points-grid">{[['Resume fix', 20], ['Evidence added', 25], ['Lesson completed', 10], ['Quiz passed', 15], ['Interview', 30], ['Claim improved', 20], ['Level completed', 100]].map(([label, points]) => <span key={label}><Sparkles /><b>{label}</b><strong>+{points}</strong></span>)}</div></Panel>
  </>
}
