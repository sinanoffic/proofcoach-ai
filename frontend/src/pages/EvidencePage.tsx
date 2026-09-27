import { Background, Controls, Handle, MarkerType, Position, ReactFlow, type Edge, type Node, type NodeProps } from '@xyflow/react'
import { AlertTriangle, Box, BriefcaseBusiness, Code2, FileCheck2, GitBranch, Link2, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DemoPath } from '../components/Shell'
import { PageIntro, Panel, StatusPill } from '../components/UI'
import { skillEvidence } from '../data/demo'
import { useTheme } from '../context/ThemeContext'

const icons = { candidate: UserRound, skill: Code2, project: Box, claim: FileCheck2, evidence: Link2, requirement: BriefcaseBusiness, gap: AlertTriangle }
function EvidenceNode({ data }: NodeProps) {
  const d = data as { label: string, kind: keyof typeof icons, status: string, note: string }; const Icon = icons[d.kind]
  return <div className={`flow-node ${d.status}`}><Handle type="target" position={Position.Left} /><span><Icon /></span><div><small>{d.kind}</small><b>{d.label}</b><em>{d.note}</em></div><Handle type="source" position={Position.Right} /></div>
}
const nodeTypes = { evidenceNode: EvidenceNode }

export function EvidencePage() {
  const { theme } = useTheme()
  const [selected, setSelected] = useState<Node | null>(null)
  const nodes = useMemo<Node[]>(() => [
    { id: 'c', type: 'evidenceNode', position: { x: 0, y: 120 }, data: { label: 'Demo Candidate', kind: 'candidate', status: 'verified', note: 'profile' } },
    { id: 'p', type: 'evidenceNode', position: { x: 230, y: 20 }, data: { label: 'Python', kind: 'skill', status: 'verified', note: 'strong evidence' } },
    { id: 'd', type: 'evidenceNode', position: { x: 230, y: 220 }, data: { label: 'Docker', kind: 'skill', status: 'missing', note: 'gap' } },
    { id: 'project', type: 'evidenceNode', position: { x: 465, y: 20 }, data: { label: 'Flood Prediction API', kind: 'project', status: 'verified', note: 'FastAPI backend' } },
    { id: 'gap', type: 'evidenceNode', position: { x: 465, y: 220 }, data: { label: 'No project evidence', kind: 'gap', status: 'missing', note: 'learning priority' } },
    { id: 'claim', type: 'evidenceNode', position: { x: 720, y: 20 }, data: { label: '35% lower latency', kind: 'claim', status: 'review', note: 'verify in interview' } },
    { id: 'interview', type: 'evidenceNode', position: { x: 975, y: 20 }, data: { label: 'Interview evidence', kind: 'evidence', status: 'partial', note: 'pending' } },
    { id: 'role', type: 'evidenceNode', position: { x: 1230, y: 20 }, data: { label: 'Backend: Python', kind: 'requirement', status: 'verified', note: 'required' } },
  ], [])
  const edges = useMemo<Edge[]>(() => {
    const edge = (id: string, source: string, target: string, danger = false): Edge => ({ id, source, target, markerEnd: { type: MarkerType.ArrowClosed }, animated: !danger, style: { stroke: danger ? (theme === 'light' ? '#d64545' : '#f26161') : (theme === 'light' ? '#1769ff' : '#27c4ff'), strokeWidth: 1.8 } })
    return [edge('1', 'c', 'p'), edge('2', 'c', 'd', true), edge('3', 'p', 'project'), edge('4', 'd', 'gap', true), edge('5', 'project', 'claim'), edge('6', 'claim', 'interview'), edge('7', 'interview', 'role')]
  }, [theme])
  const detail = selected?.data as { label: string, kind: string, status: string, note: string } | undefined
  return <>
    <PageIntro kicker="STEP 03 · CAREER EVIDENCE GRAPH" title="Make every link—and every gap—visible.">A resume term becomes strong evidence only when it connects to work, a defensible claim, interview evidence, and the target requirement.</PageIntro>
    <Panel className="graph-panel" title="Backend Developer evidence map" subtitle="Select a node for its source, strength, and next action. Drag to trace the paths." action={<div className="graph-legend"><span className="verified">Verified</span><span className="partial">Partial</span><span className="missing">Missing</span></div>}>
      <div className="graph-workspace"><div className="flow-wrap"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} colorMode={theme} onNodeClick={(_, node) => setSelected(node)} fitView minZoom={.55} maxZoom={1.4} proOptions={{ hideAttribution: true }}><Background color={theme === 'light' ? '#dfe6ef' : '#26374c'} gap={22} /><Controls /></ReactFlow></div>
      {detail && <aside className="graph-inspector" aria-live="polite"><button className="inspector-close" onClick={() => setSelected(null)} aria-label="Close node details">×</button><span className="eyebrow">{detail.kind} · {detail.status}</span><h3>{detail.label}</h3><p>{detail.kind === 'gap' || detail.status === 'missing' ? 'No supporting project or interview evidence currently links this skill to the target role.' : 'This node connects candidate work to an explicit role requirement.'}</p><dl><div><dt>Source</dt><dd>{detail.kind === 'requirement' ? 'Backend Developer role' : detail.kind === 'evidence' ? 'Interview session' : 'Demo resume and profile'}</dd></div><div><dt>Strength</dt><dd>{detail.note}</dd></div><div><dt>Connected role</dt><dd>Backend Developer</dd></div></dl><strong>Next action</strong><p>{detail.status === 'missing' ? 'Learn Docker and build a small containerized API artifact.' : detail.kind === 'claim' ? 'Practice the baseline and measurement in an interview.' : 'Trace the connected path and explain your contribution.'}</p></aside>}</div>
    </Panel>
    <div className="evidence-bottom">
      <Panel title="Role evidence coverage" subtitle="3 of 6 required skills have evidence.">
        <div className="skill-bars">{skillEvidence.map(item => <div key={item.skill}><span>{item.skill}</span><i><b className={item.status} style={{ width: item.status === 'strong' ? '92%' : item.status === 'evidence' ? '76%' : item.status === 'partial' ? '54%' : item.status === 'weak' ? '30%' : '8%' }} /></i><em className={item.status}>{item.status}</em></div>)}</div>
      </Panel>
      <Panel title="Highest-priority claim" subtitle="Selected by impact × evidence risk.">
        <div className="claim-card"><div><StatusPill state="warn">HIGH PRIORITY</StatusPill><StatusPill state="info">RESUME · PROJECT</StatusPill></div><blockquote>“Reduced API latency by 35%.”</blockquote><dl><div><dt>Metric</dt><dd>35%</dd></div><div><dt>Baseline</dt><dd className="amber-text">missing</dd></div><div><dt>Contribution</dt><dd className="amber-text">unverified</dd></div><div><dt>Evidence</dt><dd>interview needed</dd></div></dl></div>
      </Panel>
    </div>
    <div className="page-continue"><span><GitBranch size={17} />Next: challenge the claim through an adaptive evidence interview.</span><DemoPath to="/interview" label="Start claim interview" /></div>
  </>
}
