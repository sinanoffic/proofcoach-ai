import type {
  Candidate,
  ConfidenceLevel,
  FieldWithConfidence,
  InterviewEmail,
  InterviewEmailStatus,
  InterviewerInfo,
  InterviewPlatform,
  InterviewTimelineStep,
  InterviewType,
  PreparationPlan,
} from '../types'
import { apiFetch } from './api'

const PLATFORM_URL_PATTERNS: [InterviewPlatform, RegExp][] = [
  ['Google Meet', /https?:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}\b/i],
  ['Zoom', /https?:\/\/(?:[a-zA-Z0-9-]+\.)?zoom\.us\/(?:j\/|my\/|wc\/)[0-9a-zA-Z?=&_#-]+/i],
  ['Microsoft Teams', /https?:\/\/teams\.microsoft\.com\/(?:l\/meetup-join\/[^\s<>"']+)/i],
  ['Unknown', /https?:\/\/[a-zA-Z0-9-]+\.webex\.com\/[^\s<>"']+/i],
]

const INTERVIEW_TYPES: [InterviewType, RegExp][] = [
  ['Technical Interview', /\btechnical\s+(?:interview|round|discussion)\b/i],
  ['Coding Interview', /\b(?:coding|live\s+coding|programming|algorithm)\s+(?:interview|round|assessment)\b/i],
  ['HR Interview', /\b(?:hr|human\s+resources|people)\s+(?:interview|round|discussion)\b/i],
  ['Behavioral Interview', /\b(?:behavioral|culture\s+fit|values)\s+(?:interview|round|discussion)\b/i],
  ['Managerial Interview', /\b(?:managerial|hiring\s+manager|engineering\s+manager)\s+(?:interview|round)\b/i],
  ['Screening', /\b(?:screening|initial\s+screening|introductory\s+call|screen)\b/i],
  ['Assessment', /\b(?:assessment|online\s+test|take-home|hackerrank|leetcode)\b/i],
  ['Panel Interview', /\b(?:panel\s+interview|panel\s+round)\b/i],
  ['Video Interview', /\b(?:video\s+interview|virtual\s+interview)\b/i],
  ['Phone Interview', /\b(?:phone\s+interview|telephonic\s+interview|phone\s+screen)\b/i],
  ['On-site Interview', /\b(?:on-site|onsite|in-person|office\s+interview)\b/i],
]

const MONTH_NAMES = 'January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec'

export function extractMeetingLink(text: string): { link: string | null; platform: InterviewPlatform | null } {
  for (const [platform, pattern] of PLATFORM_URL_PATTERNS) {
    const match = text.match(pattern)
    if (match) {
      return { link: match[0], platform }
    }
  }
  const genericMatch = text.match(/https?:\/\/[^\s<>"']+(?:join|meet|interview|call)[^\s<>"']*/i)
  if (genericMatch) {
    return { link: genericMatch[0], platform: null }
  }
  return { link: null, platform: null }
}

export function extractHeaders(text: string): { subject?: string; sender?: string; recipient?: string; date?: string } {
  const headers: { subject?: string; sender?: string; recipient?: string; date?: string } = {}
  const lines = text.split(/\r?\n/).slice(0, 20)
  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue
    const subj = line.match(/^(?:Subject|Sub):\s*(.+)$/i)
    if (subj && !headers.subject) headers.subject = subj[1].trim()
    const from = line.match(/^(?:From|Sender):\s*(.+)$/i)
    if (from && !headers.sender) headers.sender = from[1].trim()
    const to = line.match(/^(?:To|Recipient):\s*(.+)$/i)
    if (to && !headers.recipient) headers.recipient = to[1].trim()
    const date = line.match(/^(?:Date|Sent):\s*(.+)$/i)
    if (date && !headers.date) headers.date = date[1].trim()
  }
  return headers
}

export function extractCompany(text: string, sender?: string): FieldWithConfidence<string> {
  const explicit = text.match(/\bCompany\s*:\s*([A-Za-z0-9&.\s]{2,40})/i)
  if (explicit) {
    const clean = explicit[1].split(/[\n\r,;]/)[0].trim()
    if (clean) return { value: clean, confidence: 'clearly_found', sourceText: explicit[0].trim() }
  }

  const atSymbol = text.match(/@\s*([A-Z][A-Za-z0-9&]+(?:[ \t]+[A-Z][A-Za-z0-9&]+)*)/)
  if (atSymbol) {
    const cand = atSymbol[1].trim()
    if (!['gmail', 'yahoo', 'outlook', 'google meet'].includes(cand.toLowerCase())) {
      return { value: cand, confidence: 'clearly_found', sourceText: atSymbol[0].trim() }
    }
  }

  const phrase = text.match(/\b(?:interview\s+(?:at|with)|position\s+at|role\s+at|screening\s+(?:at|with)|call\s+(?:at|with)|team\s+at|welcome\s+to)\s+([A-Z][A-Za-z0-9&]+(?:[ \t]+[A-Z][A-Za-z0-9&]+)*)/i)
  if (phrase) {
    const cand = phrase[1].trim()
    if (!['google meet', 'microsoft teams', 'zoom', 'our office', 'the team', 'phone'].includes(cand.toLowerCase())) {
      return { value: cand, confidence: 'clearly_found', sourceText: phrase[0].trim() }
    }
  }

  if (sender) {
    const domainMatch = sender.match(/@([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}/)
    if (domainMatch) {
      const domain = domainMatch[1].toLowerCase()
      if (!['gmail', 'yahoo', 'outlook', 'hotmail', 'icloud', 'proton', 'protonmail'].includes(domain)) {
        const exactMatch = text.match(new RegExp(`\\b(${domain})\\b`, 'i'))
        const formatted = exactMatch ? exactMatch[1] : domain.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
        return { value: formatted, confidence: 'inferred', sourceText: `Derived from sender domain: ${domain}` }
      }
    }
  }

  return { value: 'Unknown Company', confidence: 'not_found' }
}

export function extractRole(text: string, candidateRole?: string): FieldWithConfidence<string> {
  const explicit = text.match(/\bRole\s*:\s*([A-Za-z0-9&/\s-]{3,45})/i)
  if (explicit) {
    const clean = explicit[1].split(/[\n\r,;]/)[0].trim()
    if (clean) return { value: clean, confidence: 'clearly_found', sourceText: explicit[0].trim() }
  }

  const knownRoles = [
    'Machine Learning Intern', 'Backend Developer', 'Frontend Developer',
    'Full Stack Developer', 'Software Engineer', 'Data Scientist', 'Data Analyst',
    'DevOps Engineer', 'Cloud Architect', 'AI Research Intern', 'Systems Engineer',
  ]
  for (const role of knownRoles) {
    if (new RegExp(`\\b${role}\\b`, 'i').test(text)) {
      return { value: role, confidence: 'clearly_found', sourceText: `Matched role: ${role}` }
    }
  }

  const rolePattern = text.match(/\b(?:for\s+the|as\s+a[n]?|position\s+of|role\s+of)\s+([A-Za-z0-9&/\s-]{3,35}?(?:Intern|Developer|Engineer|Architect|Scientist|Analyst|Lead|Specialist|Manager))\b/i)
  if (rolePattern) {
    return { value: rolePattern[1].trim(), confidence: 'inferred', sourceText: rolePattern[0].trim() }
  }

  if (candidateRole) {
    return { value: candidateRole, confidence: 'inferred', sourceText: 'Inferred from candidate target role' }
  }

  return { value: 'Candidate Role', confidence: 'not_found' }
}

export function extractInterviewType(text: string): FieldWithConfidence<InterviewType> {
  for (const [type, pattern] of INTERVIEW_TYPES) {
    const match = text.match(pattern)
    if (match) {
      return { value: type, confidence: 'clearly_found', sourceText: match[0].trim() }
    }
  }
  if (/\b(?:meet|zoom|teams)\b/i.test(text)) {
    return { value: 'Video Interview', confidence: 'inferred', sourceText: 'Inferred from video platform presence' }
  }
  return { value: 'Technical Interview', confidence: 'inferred', sourceText: 'Default technical assessment route' }
}

export function extractDateAndTime(text: string, sentDate?: string): {
  date: FieldWithConfidence<string>
  time: FieldWithConfidence<string>
  timezone: FieldWithConfidence<string>
} {
  const lines = text.split(/\r?\n/)
  let bodyStartIdx = 0
  let inHeader = true
  for (let i = 0; i < Math.min(15, lines.length); i++) {
    const line = lines[i]
    if (inHeader && !line.trim()) {
      bodyStartIdx = i + 1
      break
    }
    if (!/^(?:Subject|From|To|Date|Sent|Cc|Bcc):\s*/i.test(line)) {
      inHeader = false
      bodyStartIdx = i
      break
    }
  }
  const bodyText = bodyStartIdx > 0 ? lines.slice(bodyStartIdx).join('\n') : text

  let dateVal: string | null = null
  let dateConf: ConfidenceLevel = 'not_found'
  let dateSrc: string | undefined = undefined

  const explicitDate = bodyText.match(/\bDate\s*:\s*([^\n\r]+)/i)
  if (explicitDate) {
    const candidate = explicitDate[1].trim()
    const dateMatch = candidate.match(new RegExp(`\\b(?:${MONTH_NAMES})\\.?\\s+\\d{1,2}(?:st|nd|rd|th)?,?\\s*(?:20\\d{2})?\\b`, 'i'))
    if (dateMatch) {
      dateVal = dateMatch[0].trim()
      dateConf = 'clearly_found'
      dateSrc = explicitDate[0].trim()
    } else if (candidate) {
      dateVal = candidate.slice(0, 30).trim()
      dateConf = 'clearly_found'
      dateSrc = explicitDate[0].trim()
    }
  }

  if (!dateVal) {
    const datePattern = bodyText.match(new RegExp(`\\b(?:${MONTH_NAMES})\\.?\\s+\\d{1,2}(?:st|nd|rd|th)?,?\\s*(?:20\\d{2})?\\b`, 'i'))
    if (datePattern) {
      const cand = datePattern[0].trim()
      if (!sentDate || !sentDate.toLowerCase().includes(cand.toLowerCase())) {
        dateVal = cand
        dateConf = 'clearly_found'
        dateSrc = datePattern[0].trim()
      }
    }
  }

  let timeVal: string | null = null
  let timeConf: ConfidenceLevel = 'not_found'
  let timeSrc: string | undefined = undefined

  const timeMatch = bodyText.match(/\b(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm))\b/)
  if (timeMatch) {
    timeVal = timeMatch[1].toUpperCase().trim()
    timeConf = 'clearly_found'
    timeSrc = timeMatch[0].trim()
  }

  let tzVal = 'IST'
  let tzConf: ConfidenceLevel = 'inferred'
  let tzSrc = 'Inferred default timezone'

  const tzMatch = bodyText.match(/\b(IST|PST|PDT|EST|EDT|CST|CDT|UTC|GMT|CET|BST)\b/)
  if (tzMatch) {
    tzVal = tzMatch[1].toUpperCase()
    tzConf = 'clearly_found'
    tzSrc = tzMatch[0]
  }

  return {
    date: { value: dateVal || 'Not specified', confidence: dateConf, sourceText: dateSrc },
    time: { value: timeVal || 'Not specified', confidence: timeConf, sourceText: timeSrc },
    timezone: { value: tzVal, confidence: tzConf, sourceText: tzSrc },
  }
}

export function extractPlatform(text: string, detectedUrlPlatform: InterviewPlatform | null): FieldWithConfidence<InterviewPlatform> {
  if (detectedUrlPlatform && detectedUrlPlatform !== 'Unknown') {
    return { value: detectedUrlPlatform, confidence: 'clearly_found', sourceText: `Detected link for ${detectedUrlPlatform}` }
  }
  for (const p of ['Google Meet', 'Zoom', 'Microsoft Teams'] as InterviewPlatform[]) {
    if (new RegExp(`\\b${p}\\b`, 'i').test(text)) {
      return { value: p, confidence: 'clearly_found', sourceText: `Mentioned in text: ${p}` }
    }
  }
  if (/\b(?:phone\s+call|telephonic|phone)\b/i.test(text)) {
    return { value: 'Phone', confidence: 'clearly_found', sourceText: 'Telephonic interview specified' }
  }
  if (/\b(?:in-person|on-site|office\s+location|visit\s+our\s+office)\b/i.test(text)) {
    return { value: 'In-person', confidence: 'clearly_found', sourceText: 'In-person location specified' }
  }
  return { value: 'Unknown', confidence: 'not_found' }
}

export function extractDuration(text: string): string | undefined {
  const match = text.match(/\b(?:Duration\s*:\s*)?(\d{1,3})(?:\s*-\s*\d{1,3})?[-\s]*(mins?|minutes?|hours?|hrs?)\b/i)
  if (match) {
    const num = match[1]
    const unit = match[2].toLowerCase()
    if (unit.includes('hour') || unit.includes('hr')) {
      return num === '1' ? '1 hour' : `${num} hours`
    }
    return `${num} minutes`
  }
  return undefined
}

export function extractInterviewers(text: string): InterviewerInfo[] {
  const result: InterviewerInfo[] = []
  const explicit = text.match(/\b(?:Interviewer[s]?|Speaking\s+with|Hosted\s+by|With)\s*:\s*([^\n\r]+)/i)
  if (explicit) {
    const parts = explicit[1].split(',')
    const name = parts[0].trim()
    const role = parts.length > 1 ? parts[1].trim() : undefined
    if (name && name.length < 50) {
      result.push({ name, role })
    }
  }
  if (!result.length) {
    const dr = text.match(/\b(Dr\.\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\b/)
    if (dr) {
      result.push({ name: dr[1].trim(), role: 'Interviewer' })
    }
  }
  return result
}

export function extractPreparation(text: string): { requirements: string[]; checklist: { id: string; label: string; done: boolean }[] } {
  const reqs: string[] = []
  const checklist: { id: string; label: string; done: boolean }[] = []
  let chkIdx = 1
  const low = text.toLowerCase()

  if (low.includes('resume')) {
    reqs.push('Have a copy of your resume ready')
    checklist.push({ id: `chk-${chkIdx++}`, label: 'Resume copy ready', done: true })
  }
  if (['portfolio', 'github', 'project', 'code sample'].some(k => low.includes(k))) {
    reqs.push('Review previous projects and be prepared to explain architecture')
    checklist.push({ id: `chk-${chkIdx++}`, label: 'Review project architecture & code', done: false })
  }
  if (['coding', 'editor', 'live coding', 'problem-solving', 'hackerrank'].some(k => low.includes(k))) {
    reqs.push('Have your code editor and live coding environment set up')
    checklist.push({ id: `chk-${chkIdx++}`, label: 'Coding environment & editor ready', done: false })
  }
  if (['id', 'identification', 'photo id', 'student id', 'passport', 'aadhaar'].some(k => low.includes(k))) {
    reqs.push('Bring a valid government or student identification document')
    checklist.push({ id: `chk-${chkIdx++}`, label: 'Government / Student ID available', done: false })
  }
  if (['presentation', 'slide', 'deck'].some(k => low.includes(k))) {
    reqs.push('Prepare presentation deck and slides')
    checklist.push({ id: `chk-${chkIdx++}`, label: 'Presentation deck prepared', done: false })
  }
  if (['research', 'company information', 'about us'].some(k => low.includes(k))) {
    reqs.push('Review company background and products')
    checklist.push({ id: `chk-${chkIdx++}`, label: 'Company research completed', done: false })
  }

  if (!reqs.length) {
    reqs.push('Review your resume and prepare to explain your key technical projects')
    checklist.push({ id: 'chk-1', label: 'Resume and projects review', done: true })
  }

  return { requirements: reqs, checklist }
}

export function buildSuggestedPreparation(role: string, candidateSkills?: string[]): PreparationPlan {
  const skills = candidateSkills && candidateSkills.length ? candidateSkills : ['Python', 'FastAPI', 'REST', 'SQL', 'Git']
  const low = role.toLowerCase()
  let tech: string[] = []
  let rolePrep: string[] = []

  if (low.includes('machine learning') || low.includes('ai') || low.includes('data science')) {
    tech = [
      'Python data structures, NumPy, and Pandas fundamentals',
      'Model training, evaluation metrics (precision, recall, F1, latency)',
      'FastAPI / Flask inference pipeline integration',
      'SQL data querying and aggregation',
    ]
    rolePrep = [
      'Explain model baseline, features, and trade-offs on your AI project',
      'Walk through latency reduction or model quantization techniques',
      'Discuss handling messy training data and edge-case inputs',
    ]
  } else if (low.includes('frontend') || low.includes('react')) {
    tech = [
      'React 19 hooks, component lifecycle, and state optimization',
      'TypeScript interfaces, generics, and strict type safety',
      'CSS layout, responsive design, and accessible ARIA attributes',
      'Client performance, bundle splitting, and network caching',
    ]
    rolePrep = [
      'Explain component breakdown and state management decisions',
      'Walk through accessibility considerations and responsive edge cases',
    ]
  } else {
    tech = [
      'Python / FastAPI endpoint design and middleware',
      'REST API contracts, error statuses, and payload validation',
      'Database indexing, transactions, and SQL query profiling',
      'Containerization with Docker and deployment pipelines',
    ]
    rolePrep = [
      'Explain latency reduction and caching decisions on your backend project',
      'Walk through handling high concurrency and error recovery',
      'Discuss testing strategies (unit, integration, mock test fixtures)',
    ]
  }

  const companyPrep = [
    "Research the company's recent engineering and product announcements",
    'Understand the target problem domain and user base',
    'Prepare 2-3 technical questions for the interviewer regarding team architecture',
  ]

  const matched = skills.filter(s => tech.some(t => t.toLowerCase().includes(s.toLowerCase())) || role.toLowerCase().includes(s.toLowerCase()))
  const profileMatchedSkills = matched.length ? matched : skills.slice(0, 3)

  return {
    technical: tech,
    role: rolePrep,
    company: companyPrep,
    profileMatchedSkills,
  }
}

export function buildTimeline(dateVal: string, headersDate?: string, deadlineStr?: string): InterviewTimelineStep[] {
  const steps: InterviewTimelineStep[] = [
    {
      label: 'Email Received',
      date: headersDate || 'Recently delivered',
      status: 'completed',
      detail: 'Invitation received and parsed',
    },
  ]
  if (deadlineStr) {
    steps.push({
      label: 'RSVP / Confirmation',
      date: deadlineStr,
      status: 'completed',
      detail: 'Action requested',
    })
  }
  steps.push({
    label: 'Interview Session',
    date: dateVal !== 'Not specified' ? dateVal : 'Date pending',
    status: 'current',
    detail: 'Live interview session',
  })
  steps.push({
    label: 'Follow-up & Outcome',
    date: '1–3 days post-interview',
    status: 'upcoming',
    detail: 'Feedback and next round notification',
  })
  return steps
}

export function parseEmailLocally(
  text: string,
  fileName?: string,
  candidateProfile?: Candidate,
  source: 'upload' | 'paste' = 'paste'
): InterviewEmail {
  const clean = text.trim()
  if (!clean) {
    throw new Error('Email content cannot be empty.')
  }

  const headers = extractHeaders(clean)
  const { link: meetingLink, platform: urlPlatform } = extractMeetingLink(clean)

  const company = extractCompany(clean, headers.sender)
  const role = extractRole(clean, candidateProfile?.targetRole)
  const interviewType = extractInterviewType(clean)
  const { date, time, timezone } = extractDateAndTime(clean, headers.date)
  const platform = extractPlatform(clean, urlPlatform)
  const duration = extractDuration(clean)
  const interviewers = extractInterviewers(clean)
  const { requirements, checklist } = extractPreparation(clean)
  const suggestedPreparation = buildSuggestedPreparation(role.value, candidateProfile ? [candidateProfile.targetRole, 'Python', 'FastAPI', 'SQL'] : undefined)

  // Deadlines
  const deadlineMatch = clean.match(/\b(?:confirm|confirm availability|rsvp|submit|respond|complete\s+by)\s+(?:by|before|on)?\s*([A-Za-z0-9,.\s]{4,30}?20\d{2}|[A-Za-z]+\s+\d{1,2})\b/i)
  const deadlines = deadlineMatch ? [{ label: 'Confirm availability / RSVP', date: deadlineMatch[1].trim() }] : []
  const timeline = buildTimeline(date.value, headers.date, deadlines[0]?.date)

  // Location
  const locMatch = clean.match(/\b(?:Location|Address|Venue)\s*:\s*([^\n\r]+)/i)
  const location = locMatch ? locMatch[1].trim() : undefined

  let status: InterviewEmailStatus = 'Upcoming'
  if (date.confidence === 'not_found') {
    status = 'Needs Review'
  }

  const interviewerClause = interviewers.length ? ` with ${interviewers[0].name}` : ''
  const durationClause = duration ? ` The interview is expected to last ${duration} and includes a ${interviewType.value.toLowerCase()}.` : ` Includes a ${interviewType.value.toLowerCase()}.`
  const timePart = time.value !== 'Not specified' ? ` at ${time.value} ${timezone.value}` : ''
  const datePart = date.value !== 'Not specified' ? ` on ${date.value}` : ''
  const platformPart = platform.value !== 'Unknown' ? ` via ${platform.value}` : ''

  const summary = `Your ${role.value} interview with ${company.value} is scheduled${datePart}${timePart}${platformPart}${interviewerClause}.${durationClause}`

  const now = new Date().toISOString()
  const id = `ie-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

  return {
    id,
    source,
    fileName,
    originalEmail: clean,
    subject: headers.subject,
    sender: headers.sender,
    recipient: headers.recipient,
    company,
    role,
    interviewType,
    interviewDate: date,
    interviewTime: time,
    timezone,
    platform,
    meetingLink: meetingLink || undefined,
    location,
    duration,
    interviewers,
    preparationRequirements: requirements,
    preparationChecklist: checklist,
    suggestedPreparation,
    deadlines,
    attachments: ['None detected'],
    timeline,
    summary,
    status,
    createdAt: now,
    updatedAt: now,
  }
}

export async function processEmailIntelligence(input: {
  file?: File
  text?: string
  candidate?: Candidate
}): Promise<InterviewEmail> {
  const { file, text, candidate } = input

  // If a file is uploaded
  if (file) {
    if (!/\.(pdf|docx|txt|eml)$/i.test(file.name) || file.size > 8 * 1024 * 1024) {
      throw new Error('Please select a PDF, DOCX, or TXT file under 8 MB.')
    }

    // Try backend upload endpoint first if available
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await apiFetch<Record<string, any>>('/api/interview-email/upload', {
        method: 'POST',
        body: formData,
      })
      if (res && res.id) {
        return normalizeBackendResult(res)
      }
    } catch {
      // Backend offline or error: if text file, process client-side
      if (/\.(txt|eml)$/i.test(file.name)) {
        const fileContent = await file.text()
        return parseEmailLocally(fileContent, file.name, candidate, 'upload')
      }
      throw new Error('Local backend is offline. PDF and DOCX files require the local FastAPI server. You can paste the email text directly below.')
    }
  }

  // If raw text is provided
  if (text) {
    if (!text.trim()) {
      throw new Error('Please paste your interview email content.')
    }

    try {
      const res = await apiFetch<Record<string, any>>('/api/interview-email/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_text: text,
          candidate_skills: candidate ? ['Python', 'FastAPI', 'REST', 'SQL', 'Git'] : undefined,
          candidate_role: candidate?.targetRole,
        }),
      })
      if (res && res.id) {
        return normalizeBackendResult(res)
      }
    } catch {
      // Fallback to client-side extraction
      return parseEmailLocally(text, undefined, candidate, 'paste')
    }
  }

  throw new Error('Please provide an email file or paste email text.')
}

function normalizeBackendResult(res: Record<string, any>): InterviewEmail {
  return {
    id: res.id,
    source: res.source,
    fileName: res.file_name,
    originalEmail: res.original_email,
    subject: res.subject,
    sender: res.sender,
    recipient: res.recipient,
    company: res.company,
    role: res.role,
    interviewType: res.interview_type,
    interviewDate: res.interview_date,
    interviewTime: res.interview_time,
    timezone: res.timezone,
    platform: res.platform,
    meetingLink: res.meeting_link,
    location: res.location,
    duration: res.duration,
    interviewers: res.interviewers || [],
    preparationRequirements: res.preparation_requirements || [],
    preparationChecklist: res.preparation_checklist || [],
    suggestedPreparation: {
      technical: res.suggested_preparation?.technical || [],
      role: res.suggested_preparation?.role || [],
      company: res.suggested_preparation?.company || [],
      profileMatchedSkills: res.suggested_preparation?.profile_matched_skills || [],
    },
    deadlines: res.deadlines || [],
    attachments: res.attachments || [],
    timeline: res.timeline || [],
    summary: res.summary,
    status: res.status,
    createdAt: res.created_at,
    updatedAt: res.updated_at,
  }
}
