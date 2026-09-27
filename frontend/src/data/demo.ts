import type { DemoState, SkillEvidence } from '../types'

export const demoAnswer = 'The original endpoint averaged about 420 ms before my change and around 273 ms after it. I profiled the route, found repeated database reads, and I added a bounded in-memory cache. I measured several runs using Postman and compared the average, but I did not preserve the full test sample or p95 results. My contribution was implementing the cache and timing the endpoint.'

export const initialDemoState: DemoState = {
  candidate: {
    name: 'Demo Candidate', category: 'Student', education: 'BE Artificial Intelligence & Machine Learning',
    experience: 'Student — 2nd year', targetCareer: 'Software Engineering', targetRole: 'Backend Developer',
    targetCompany: '', dailyMinutes: 150, interviewMode: 'Text', interviewerPersona: 'Auto Pair', voluntaryGender: '',
  },
  completed: ['onboarding'],
  metrics: { parser: 82, coverage: 50, interview: 68, claim: 58, learning: 36, questPoints: 185 },
  interviewAnswered: false,
  currentQuestion: 0,
  answer: '',
  evidenceLockDemo: 'idle',
}

export const parserChecks = [
  { label: 'Text extraction', value: 'PASS', state: 'pass', detail: '1,148 readable characters' },
  { label: 'Contact details', value: 'PASS', state: 'pass', detail: 'Email and phone recovered' },
  { label: 'Education', value: 'PASS', state: 'pass', detail: 'Degree and timeline recovered' },
  { label: 'Projects', value: 'PASS', state: 'pass', detail: '2 project entries recovered' },
  { label: 'Skills', value: '13 / 16', state: 'warn', detail: 'Three terms need clearer context' },
  { label: 'Two-column layout', value: 'WARNING', state: 'warn', detail: 'Reading order may be ambiguous' },
  { label: 'Table section', value: 'WARNING', state: 'warn', detail: 'Some parsers may reorder cells' },
]

export const skillEvidence: SkillEvidence[] = [
  { skill: 'Python', status: 'strong', note: 'Project + implementation evidence' },
  { skill: 'REST', status: 'evidence', note: 'FastAPI endpoint implementation' },
  { skill: 'SQL', status: 'partial', note: 'Mentioned; depth not demonstrated' },
  { skill: 'Docker', status: 'missing', note: 'No resume or project evidence' },
  { skill: 'Testing', status: 'weak', note: 'Manual checks only' },
  { skill: 'System Design', status: 'missing', note: 'No design evidence yet' },
]

export const beforeAfter = [
  { label: 'Technical Depth', before: 61, after: 78 },
  { label: 'Answer Structure', before: 58, after: 76 },
  { label: 'Claim Evidence', before: 50, after: 82 },
  { label: 'Skill Coverage', before: 67, after: 74 },
]

export const questLevels = [
  { level: 1, name: 'BUILD', subtitle: 'Make your profile machine-readable', status: 'complete', points: 145, items: ['Resume parsed', 'Target role selected', 'Evidence profile built'] },
  { level: 2, name: 'PROVE', subtitle: 'Turn claims into defensible evidence', status: 'active', points: 40, items: ['Verify key claim', 'Complete gap lesson', 'Pass a practice quiz'] },
  { level: 3, name: 'PERFORM', subtitle: 'Defend your work under pressure', status: 'locked', points: 0, items: ['Technical interview', 'Communication round', 'Final role simulation'] },
]

