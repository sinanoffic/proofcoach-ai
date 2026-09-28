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

export interface ProjectTask {
  id: string
  title: string
  stage: 'NEXT' | 'THIS WEEK' | 'LATER' | 'COMPLETED'
  completed: boolean
  priority?: string
  evidence?: string
  skill?: string
}

export interface ProjectState {
  id: string
  name: string
  goal: string
  stage: string
  progress: number
  tasks: ProjectTask[]
}

export interface VideoNote {
  id: string
  timestamp: number
  topic: string
  text: string
}

export interface VideoState {
  watched: number
  understood: number
  practiced: number
  applied: number
  proven: number
  notes: VideoNote[]
}

export interface DemoState {
  candidate: Candidate
  completed: string[]
  metrics: Record<MetricKey, number>
  interviewAnswered: boolean
  currentQuestion: number
  answer: string
  interviewSessionId: number | null
  evaluation: any | null
  evidenceLockDemo: 'idle' | 'safe' | 'blocked'
  project: ProjectState | null
  video: VideoState
}

export interface SkillEvidence {
  skill: string
  status: 'strong' | 'evidence' | 'partial' | 'weak' | 'missing'
  note: string
}

