import { ArrowRight, BookOpenCheck, Box, CheckCircle2, Clock3, ExternalLink, FlaskConical, Layers3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageIntro, Panel, StatusPill } from '../components/UI'
import { useProof } from '../context/ProofContext'

const tasks = [
  { skill: 'Docker', priority: 1, icon: Box, time: '4–6 hours', source: 'Docker Get Started', provider: 'Docker', href: 'https://docs.docker.com/get-started/', artifact: 'Containerize the FastAPI backend', quiz: '5-question PYQ-style Practice' },
  { skill: 'Testing', priority: 2, icon: FlaskConical, time: '3–5 hours', source: 'pytest Getting Started', provider: 'pytest', href: 'https://docs.pytest.org/en/stable/getting-started.html', artifact: 'Add API and service tests', quiz: '5-question PYQ-style Practice' },
  { skill: 'System Design', priority: 3, icon: Layers3, time: '10–15 hours', source: 'System Design Primer', provider: 'GitHub', href: 'https://github.com/donnemartin/system-design-primer', artifact: 'Draw and defend one architecture', quiz: 'Scenario explanation practice' },
]

export function LearnPage() {
  const nav = useNavigate()
  const { state } = useProof()
  const [learningPlan, setLearningPlan] = useState(tasks)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8000/api/learning/plan', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gaps: ['Docker', 'Testing', 'System Design'], daily_minutes: state.candidate.dailyMinutes })
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.plan) {
          // map data.plan back to UI shape, or just use the UI shapes if matched
          const backendTasks = data.plan.map((item: any, i: number) => ({
            skill: item.skill, priority: item.priority || i + 1, icon: i === 0 ? Box : i === 1 ? FlaskConical : Layers3,
            time: item.time_estimate, source: item.source_name, provider: item.provider, href: item.url,
            artifact: item.artifact_goal, quiz: 'PYQ-style Practice'
          }))
          setLearningPlan(backendTasks)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [state.candidate.dailyMinutes])

  return <>
    <PageIntro kicker="STEP 06 · PERSONALIZED LEARNING" title="Learn only what closes a real evidence gap.">Your plan prioritizes missing role evidence and converts each lesson into a visible artifact you can defend.</PageIntro>
    <div className="learning-summary"><div><span>GOOD</span><i>Python</i><i>FastAPI</i><i>REST</i></div><div><span>NEEDS WORK</span><i>Docker</i><i>Testing</i><i>System Design</i></div><div><Clock3 /><span><b>{Math.floor(state.candidate.dailyMinutes / 60)}h {state.candidate.dailyMinutes % 60}m / day</b><small>75% learning · 25% practice</small></span></div></div>
    {loading ? <div style={{ padding: '2rem', textAlign: 'center' }}>Loading learning plan...</div> : <div className="learning-grid">{learningPlan.map(({ skill, priority, icon: Icon, time, source, provider, href, artifact, quiz }) => <Panel key={skill} className="learning-card">
      <div className="learning-head"><span><Icon /></span><div><small>PRIORITY 0{priority}</small><h3>{skill}</h3></div><StatusPill state={priority === 1 ? 'danger' : 'warn'}>{priority === 1 ? 'ROLE BLOCKER' : 'GAP'}</StatusPill></div>
      <div className="learning-track"><div><BookOpenCheck /><span><small>LEARN</small><b>{source}</b><em>{provider} · {time} · Free</em></span><a href={href} target="_blank" rel="noreferrer" aria-label={`Open ${source}`}><ExternalLink /></a></div><div><CheckCircle2 /><span><small>BUILD EVIDENCE</small><b>{artifact}</b><em>Commit artifact + explain trade-offs</em></span></div><div><FlaskConical /><span><small>PRACTICE</small><b>{quiz}</b><em>Generated practice—not an actual PYQ</em></span></div></div>
      <button className="btn outline wide" onClick={() => nav('/focus')}>Start focus session <ArrowRight /></button>
    </Panel>)}</div>}
    <div className="source-note"><CheckCircle2 /><div><b>Source honesty</b><p>These are established, free learning sources. Certificate availability is shown only when verified; these recommendations do not claim a certificate.</p></div><button className="btn primary" onClick={() => nav('/video-plan')}>Plan a long video</button></div>
  </>
}

