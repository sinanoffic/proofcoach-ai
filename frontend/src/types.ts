export type MetricKey = 'parser' | 'coverage' | 'interview' | 'claim' | 'learning' | 'questPoints'

export interface Candidate {
  name: string
  category: 'Student' | 'Fresher' | 'Early-career professional' | 'Career switcher'
  education: string
  experience: string
  targetCareer: string
  targetRole: string
  targetCompany: string
  dailyMinutes: number
  interviewMode: 'Text' | 'Voice'
  interviewerPersona: 'Female AI interviewer' | 'Male AI interviewer' | 'Neutral' | 'Auto Pair'
  voluntaryGender: string
}

export interface DemoState {
  candidate: Candidate
  completed: string[]
  metrics: Record<MetricKey, number>
  interviewAnswered: boolean
  currentQuestion: number
  answer: string
  evidenceLockDemo: 'idle' | 'safe' | 'blocked'
}

export interface SkillEvidence {
  skill: string
  status: 'strong' | 'evidence' | 'partial' | 'weak' | 'missing'
  note: string
}

