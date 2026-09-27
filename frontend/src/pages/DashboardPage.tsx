import { ArrowRight, BookOpen, CalendarClock, FileSearch, Gauge, GitBranch, LockKeyhole, Target, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { MetricCard, PageIntro, Panel, StatusPill } from '../components/UI'
import { beforeAfter } from '../data/demo'
import { useProof } from '../context/ProofContext'
import { useTheme } from '../context/ThemeContext'

export function DashboardPage() {
  const { state } = useProof(); const { theme } = useTheme(); const nav = useNavigate(); const m = state.metrics
  const chart = theme === 'light' ? { grid: '#dfe6ef', tick: '#65758a', tooltip: '#ffffff', border: '#cbd7e5', before: '#cbd7e5', after: '#1769ff' } : { grid: '#26374c', tick: '#a8b7ca', tooltip: '#0d1726', border: '#34445b', before: '#41536b', after: '#27c4ff' }
  return <>
    <PageIntro kicker="YOUR PREPARATION OVERVIEW" title={`Good ${new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, ${state.candidate.name || 'candidate'}.`}>Your progress toward {state.candidate.targetRole}. Each measure has its own evidence and a clear next step.</PageIntro>
    <div className="dashboard-overview"><div><span>YOUR TARGET</span><strong>{state.candidate.targetRole}</strong><p>Build confidence through demonstrated work, one claim at a time.</p></div><div><span>RECOMMENDED NEXT</span><strong>Defend your latency claim</strong><button className="text-link" onClick={() => nav('/interview')}>Practice the evidence <ArrowRight size={17} /></button></div></div>
    <div className="metrics-grid">
      <MetricCard label="Parser robustness" value={m.parser} suffix="/100" detail="2 layout warnings" icon={<FileSearch />} />
      <MetricCard label="Role evidence" value={m.coverage} suffix="%" detail="3 of 6 required skills" tone="cyan" icon={<GitBranch />} />
      <MetricCard label="Interview readiness" value={m.interview} suffix="%" detail="Trade-offs need work" tone="violet" icon={<Gauge />} />
      <MetricCard label="Claim verification" value={m.claim} suffix="%" detail="1 priority claim open" tone="amber" icon={<LockKeyhole />} />
      <MetricCard label="Learning progress" value={m.learning} suffix="%" detail="3 priority gaps" tone="green" icon={<BookOpen />} />
      <MetricCard label="Career quest" value={Math.min(100, Math.round(m.questPoints / 4))} suffix="%" detail={`${m.questPoints} evidence XP`} tone="sapphire" icon={<Trophy />} />
    </div>
    <div className="dashboard-grid">
      <Panel title="Top priority" subtitle="The fastest improvement to your role evidence." className="priority-panel">
        <div className="priority-row"><span className="priority-icon"><Target /></span><div><StatusPill state="warn">HIGH IMPACT</StatusPill><h3>Defend the 35% latency claim</h3><p>Explain the original baseline, measurement method, your personal contribution, and technical trade-offs.</p><button className="text-link" onClick={() => nav('/interview')}>Start evidence interview <ArrowRight /></button></div></div>
      </Panel>
      <Panel title="Next 48 hours" subtitle="A focused, realistic sequence.">
        <div className="task-list">
          <button onClick={() => nav('/interview')}><i>01</i><span><b>Claim verification interview</b><small>12–15 min · due today</small></span><ArrowRight /></button>
          <button onClick={() => nav('/learn')}><i>02</i><span><b>Docker foundations + artifact</b><small>90 min · evidence gap</small></span><ArrowRight /></button>
          <button onClick={() => nav('/focus')}><i>03</i><span><b>Testing practice sprint</b><small>45 min · focus session</small></span><ArrowRight /></button>
        </div>
      </Panel>
      <Panel title="Before vs after" subtitle="Session 1 compared with your latest demonstrated performance." className="chart-panel">
        <ResponsiveContainer width="100%" height={260}><BarChart data={beforeAfter} barGap={5}><CartesianGrid stroke={chart.grid} vertical={false} /><XAxis dataKey="label" tick={{ fill: chart.tick, fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis domain={[0, 100]} tick={{ fill: chart.tick, fontSize: 12 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: chart.tooltip, color: chart.tick, border: `1px solid ${chart.border}`, borderRadius: 10 }} /><Bar dataKey="before" fill={chart.before} radius={[5, 5, 0, 0]} /><Bar dataKey="after" fill={chart.after} radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer>
        <div className="chart-legend"><span><i className="before" />Session 1</span><span><i className="after" />Session 2</span></div>
      </Panel>
      <Panel title="Next interview" subtitle="Claim verification · Backend Developer">
        <div className="interview-card"><div className="calendar"><CalendarClock /><b>TODAY</b><strong>15</strong><small>minutes</small></div><div><StatusPill state="info">LEVEL D → E</StatusPill><h3>Evidence pressure test</h3><p>One claim, two adaptive follow-ups, direct evidence feedback.</p><button className="btn primary" onClick={() => nav('/interview')}>Enter interview</button></div></div>
      </Panel>
    </div>
  </>
}
