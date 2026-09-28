import { Beaker, CheckCircle2, ChevronRight, Circle, FileText, Search, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageIntro, Panel, StatusPill } from '../components/UI'
import { useProof } from '../context/ProofContext'
import type { ProjectState } from '../types'

export function ProjectLabPage() {
  const { state, completeTask } = useProof()
  const project = state.project

  if (!project) return <NewProject />

  const nextTasks = project.tasks.filter(t => t.stage === 'NEXT')
  const thisWeekTasks = project.tasks.filter(t => t.stage === 'THIS WEEK')
  const laterTasks = project.tasks.filter(t => t.stage === 'LATER')
  const completedTasks = project.tasks.filter(t => t.stage === 'COMPLETED')
  const nextAction = nextTasks[0] || thisWeekTasks[0]

  return <>
    <PageIntro kicker="PROJECT LAB" title="Turn your learning into something you can prove."> </PageIntro>
    
    <div className="project-dashboard">
      <Panel className="project-hero">
        <div className="project-hero-content">
          <div className="project-head">
            <span className="eyebrow"><Beaker size={14}/> {project.name}</span>
            <h2>{project.goal}</h2>
            <div className="project-progress">
              <span><b>{project.progress}%</b> PROGRESS</span>
              <div className="meter"><span style={{ width: `${project.progress}%` }} /></div>
            </div>
          </div>
          <div className="project-metrics">
            <div className="metric-box"><span>Current Stage</span><b>{project.stage}</b></div>
            <div className="metric-box"><span>Next Action</span><b>{nextAction ? nextAction.title : 'Complete!'}</b></div>
            <div className="metric-box"><span>Evidence</span><b>{completedTasks.filter(t => t.evidence).length} items</b></div>
          </div>
        </div>
      </Panel>

      <div className="project-journey">
        {['IDEA', 'RESEARCH', 'PLAN', 'BUILD', 'TEST', 'IMPROVE', 'DOCUMENT', 'DEPLOY', 'DEFEND'].map((stage, i) => (
          <div key={stage} className={`journey-step ${project.stage === stage ? 'active' : ''} ${i < 3 ? 'completed' : ''}`}>
            <span>{i < 3 ? <CheckCircle2 size={14} /> : <Circle size={14} />}</span>
            <b>{stage}</b>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="form-stack">
          <Panel title="What I need to do" subtitle="Automatically organized from your project state.">
            <div className="task-board">
              <div className="task-col">
                <h4>NEXT</h4>
                {nextTasks.map(t => (
                  <button key={t.id} className="task-card" onClick={() => completeTask(t.id)}>
                    <Circle size={14} />
                    <span><b>{t.title}</b>{t.skill && <small>{t.skill}</small>}</span>
                  </button>
                ))}
              </div>
              <div className="task-col">
                <h4>THIS WEEK</h4>
                {thisWeekTasks.map(t => (
                  <button key={t.id} className="task-card" onClick={() => completeTask(t.id)}>
                    <Circle size={14} />
                    <span><b>{t.title}</b></span>
                  </button>
                ))}
              </div>
              <div className="task-col">
                <h4>LATER</h4>
                {laterTasks.map(t => (
                  <button key={t.id} className="task-card disabled">
                    <Circle size={14} />
                    <span><b>{t.title}</b></span>
                  </button>
                ))}
              </div>
            </div>
          </Panel>

          <Panel title="What I've done" subtitle="Completed work as evidence-based items.">
            <div className="done-list">
              {completedTasks.map(t => (
                <div key={t.id} className="done-item">
                  <CheckCircle2 size={16} />
                  <div>
                    <b>{t.title}</b>
                    <small>{t.evidence ? `Evidence: ${t.evidence}` : 'Verified manually'}</small>
                  </div>
                  {t.skill && <i>{t.skill}</i>}
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="form-stack">
          {nextAction && (
            <Panel title="Smart Next Action" action={<StatusPill state="info">AI Suggested</StatusPill>}>
              <div className="smart-action">
                <Search size={24} />
                <div>
                  <h3>{nextAction.title}</h3>
                  <p>Your {project.stage.toLowerCase()} stage is almost complete and this task unlocks the next stage.</p>
                  <button className="btn primary" onClick={() => completeTask(nextAction.id)}>Complete Task</button>
                </div>
              </div>
            </Panel>
          )}

          <Panel title="Project Evidence" subtitle="Connects to your resume.">
            <div className="evidence-connect">
              {completedTasks.filter(t => t.evidence).slice(0,3).map((t) => (
                <div key={t.id} className="evidence-link">
                  <FileText size={16} />
                  <span><b>{t.skill || 'Skill'}</b><small>{t.title}</small></span>
                  <StatusPill state="pass">Evidence ready</StatusPill>
                </div>
              ))}
              <div className="page-continue">
                <span><ShieldCheck size={18} /> Review safe claims</span>
                <Link to="/resume" className="btn outline">Use in Resume</Link>
              </div>
            </div>
          </Panel>

          <Panel title="Defend This Project" subtitle="Generate interview topics from completed work.">
            <div className="defend-preview">
              <p>1. Why did you choose this architecture?</p>
              <p>2. What was the biggest technical problem?</p>
              <p>3. How did you test the system?</p>
              <Link to="/interview" className="btn primary wide">Start Project Interview <ChevronRight size={17}/></Link>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  </>
}

function NewProject() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const { updateProject } = useProof()

  const create = () => {
    const demoProject: ProjectState = {
      id: 'p' + Date.now(),
      name: name || 'New Project',
      goal: goal || 'Build something amazing',
      stage: 'IDEA',
      progress: 0,
      tasks: [{ id: 't1', title: 'Research', stage: 'NEXT', completed: false }]
    }
    updateProject(demoProject)
  }

  return <>
    <PageIntro kicker="PROJECT LAB" title="Turn your learning into something you can prove."> </PageIntro>
    <Panel className="new-project-wizard">
      <div className="wizard-step">
        {step === 1 && <>
          <h3>What is your project name?</h3>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. AI Flood Prediction System" autoFocus />
          <button className="btn primary" onClick={() => setStep(2)}>Continue</button>
        </>}
        {step === 2 && <>
          <h3>What are you building and why?</h3>
          <textarea value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g. Build an AI-assisted disaster alert..." rows={3} autoFocus />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn outline" onClick={() => setStep(1)}>Back</button>
            <button className="btn primary" onClick={create}>Create Project</button>
          </div>
        </>}
      </div>
    </Panel>
  </>
}
