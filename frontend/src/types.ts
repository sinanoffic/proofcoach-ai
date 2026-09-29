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

export type ConfidenceLevel = 'clearly_found' | 'inferred' | 'not_found'

export type InterviewType =
  | 'HR Interview'
  | 'Technical Interview'
  | 'Coding Interview'
  | 'Behavioral Interview'
  | 'Managerial Interview'
  | 'Assessment'
  | 'Screening'
  | 'Panel Interview'
  | 'Video Interview'
  | 'Phone Interview'
  | 'On-site Interview'
  | 'Unknown'

export type InterviewPlatform =
  | 'Google Meet'
  | 'Zoom'
  | 'Microsoft Teams'
  | 'Phone'
  | 'In-person'
  | 'Unknown'

export type InterviewEmailStatus =
  | 'Upcoming'
  | 'Today'
  | 'Completed'
  | 'Cancelled'
  | 'Needs Review'

export interface FieldWithConfidence<T> {
  value: T
  confidence: ConfidenceLevel
  sourceText?: string
}

export interface InterviewerInfo {
  name: string
  role?: string
}

export interface PreparationPlan {
  technical: string[]
  role: string[]
  company: string[]
  profileMatchedSkills: string[]
}

export interface InterviewTimelineStep {
  label: string
  date?: string
  status: 'completed' | 'current' | 'upcoming'
  detail?: string
}

export interface InterviewEmail {
  id: string
  source: 'upload' | 'paste'
  fileName?: string
  originalEmail: string
  subject?: string
  sender?: string
  recipient?: string
  company: FieldWithConfidence<string>
  role: FieldWithConfidence<string>
  interviewType: FieldWithConfidence<InterviewType>
  interviewDate: FieldWithConfidence<string>
  interviewTime: FieldWithConfidence<string>
  timezone: FieldWithConfidence<string>
  platform: FieldWithConfidence<InterviewPlatform>
  meetingLink?: string
  location?: string
  duration?: string
  interviewers: InterviewerInfo[]
  preparationRequirements: string[]
  preparationChecklist: { id: string; label: string; done: boolean }[]
  suggestedPreparation: PreparationPlan
  deadlines: { label: string; date: string }[]
  attachments: string[]
  timeline: InterviewTimelineStep[]
  summary: string
  status: InterviewEmailStatus
  createdAt: string
  updatedAt: string
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
  interviewEmails: InterviewEmail[]
}

export interface SkillEvidence {
  skill: string
  status: 'strong' | 'evidence' | 'partial' | 'weak' | 'missing'
  note: string
}


