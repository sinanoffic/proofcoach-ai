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
  interviewSessionId: null,
  evaluation: null,
  evidenceLockDemo: 'idle',
  project: {
    id: 'p1',
    name: 'AI SafeRoute',
    goal: 'Build an AI-assisted disaster alert and evacuation guidance system.',
    stage: 'BUILD',
    progress: 68,
    tasks: [
      { id: 't1', title: 'Problem research', stage: 'COMPLETED', completed: true, evidence: 'Research notes', skill: 'Analysis' },
      { id: 't2', title: 'Architecture', stage: 'COMPLETED', completed: true, evidence: 'Architecture diagram', skill: 'System Design' },
      { id: 't3', title: 'Frontend', stage: 'COMPLETED', completed: true, evidence: 'Codebase', skill: 'React' },
      { id: 't4', title: 'Map interface', stage: 'COMPLETED', completed: true, evidence: 'Feature Demo', skill: 'Maps API' },
      { id: 't5', title: 'Disaster workflow', stage: 'COMPLETED', completed: true, evidence: 'Demo', skill: 'Workflow logic' },
      { id: 't6', title: 'Route intelligence', stage: 'NEXT', completed: false, priority: 'High', skill: 'Algorithms' },
      { id: 't7', title: 'Mobile support', stage: 'THIS WEEK', completed: false },
      { id: 't8', title: 'Validation & Testing', stage: 'THIS WEEK', completed: false },
      { id: 't9', title: 'Documentation', stage: 'LATER', completed: false },
      { id: 't10', title: 'Deployment', stage: 'LATER', completed: false },
    ]
  },
  video: {
    watched: 42,
    understood: 35,
    practiced: 28,
    applied: 20,
    proven: 12,
    notes: [
      { id: 'n1', timestamp: 1102, topic: 'Python decorators', text: 'Important for auth middleware' },
      { id: 'n2', timestamp: 5844, topic: 'JWT authentication', text: 'Need to revise JWT.' },
      { id: 'n3', timestamp: 8140, topic: 'API security', text: 'Rate limiting concepts' },
    ]
  },
  interviewEmails: [
    {
      id: 'ie-demo-1',
      source: 'paste',
      fileName: 'ABC_Tech_ML_Intern_Interview.txt',
      originalEmail: `Subject: Invitation: Machine Learning Intern Technical Interview @ ABC Technologies
From: recruiting@abctechnologies.com
To: demo.candidate@example.test
Date: September 28, 2026

Dear Candidate,

Thank you for applying for the Machine Learning Intern position at ABC Technologies. We were impressed with your application and would like to invite you for a 45-minute Technical Interview.

Interview Details:
- Role: Machine Learning Intern
- Company: ABC Technologies
- Date: October 3, 2026
- Time: 2:00 PM IST
- Platform: Google Meet
- Link: https://meet.google.com/abc-defg-hij
- Interviewer: Dr. Rajesh Sharma, Lead AI Scientist

Preparation Instructions:
- Please have a copy of your resume ready.
- Prepare to discuss your machine learning and backend project architecture.
- Have your code editor ready for a quick live problem-solving exercise in Python.
- Bring a valid student or government identification document.

Please confirm your availability by September 30, 2026.

Best regards,
University Talent Acquisition Team
ABC Technologies`,
      subject: 'Invitation: Machine Learning Intern Technical Interview @ ABC Technologies',
      sender: 'recruiting@abctechnologies.com',
      recipient: 'demo.candidate@example.test',
      company: { value: 'ABC Technologies', confidence: 'clearly_found', sourceText: 'Company: ABC Technologies' },
      role: { value: 'Machine Learning Intern', confidence: 'clearly_found', sourceText: 'Role: Machine Learning Intern' },
      interviewType: { value: 'Technical Interview', confidence: 'clearly_found', sourceText: '45-minute Technical Interview' },
      interviewDate: { value: 'October 3, 2026', confidence: 'clearly_found', sourceText: 'October 3, 2026' },
      interviewTime: { value: '2:00 PM', confidence: 'clearly_found', sourceText: '2:00 PM' },
      timezone: { value: 'IST', confidence: 'clearly_found', sourceText: 'IST' },
      platform: { value: 'Google Meet', confidence: 'clearly_found', sourceText: 'Google Meet' },
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      duration: '45 minutes',
      interviewers: [{ name: 'Dr. Rajesh Sharma', role: 'Lead AI Scientist' }],
      preparationRequirements: [
        'Have a copy of your resume ready',
        'Prepare to discuss machine learning & backend project architecture',
        'Live problem-solving exercise in Python',
        'Bring valid student or government identification document',
      ],
      preparationChecklist: [
        { id: 'chk-1', label: 'Resume copy ready', done: true },
        { id: 'chk-2', label: 'Review ML & backend project architecture', done: false },
        { id: 'chk-3', label: 'Python live coding setup verified', done: false },
        { id: 'chk-4', label: 'Student or Government ID available', done: false },
      ],
      suggestedPreparation: {
        technical: [
          'Python data structures & algorithms',
          'Machine Learning model training & evaluation basics',
          'FastAPI endpoints & REST latency profiling',
          'SQL query optimization',
        ],
        role: [
          'Walk through latency reduction in Flood Prediction API',
          'Explain trade-offs between model precision and response time',
          'Discuss database caching vs in-memory caching',
        ],
        company: [
          'Research ABC Technologies AI products and case studies',
          'Review company engineering publications',
          'Prepare 2-3 thoughtful questions about internship mentoring',
        ],
        profileMatchedSkills: ['Python', 'Machine Learning', 'FastAPI', 'SQL'],
      },
      deadlines: [{ label: 'Confirm availability', date: 'September 30, 2026' }],
      attachments: ['None detected'],
      timeline: [
        { label: 'Email Received', date: 'Sep 28, 2026', status: 'completed', detail: 'Invitation delivered' },
        { label: 'RSVP Deadline', date: 'Sep 30, 2026', status: 'completed', detail: 'Confirmed availability' },
        { label: 'Technical Interview', date: 'Oct 3, 2026 · 2:00 PM', status: 'current', detail: 'Live on Google Meet' },
        { label: 'Debrief & Follow-up', date: 'Oct 5, 2026', status: 'upcoming', detail: 'Next round outcome' },
      ],
      summary: 'Your Machine Learning Intern interview with ABC Technologies is scheduled for October 3, 2026 at 2:00 PM IST via Google Meet. The interview is expected to last 45 minutes with Dr. Rajesh Sharma and includes a technical discussion.',
      status: 'Upcoming',
      createdAt: '2026-09-28T14:30:00.000Z',
      updatedAt: '2026-09-28T14:30:00.000Z',
    },
    {
      id: 'ie-demo-2',
      source: 'upload',
      fileName: 'CloudScale_Screening.pdf',
      originalEmail: `Subject: Next Steps: Backend Developer Screening Call with CloudScale Systems
From: talent@cloudscalesystems.io
To: demo.candidate@example.test
Date: September 29, 2026

Hi Candidate,

We are pleased to invite you to an initial technical screening for the Backend Developer role at CloudScale Systems.

Interview Details:
- Role: Backend Developer
- Company: CloudScale Systems
- Date: October 5, 2026
- Time: 11:00 AM IST
- Duration: 30 minutes
- Platform: Zoom
- Link: https://zoom.us/j/9876543210
- Interviewer: Maya Patel, Engineering Hiring Manager

Topics Covered:
We will discuss your backend background with FastAPI and REST APIs, database design, and your understanding of containerization with Docker. Please have your resume handy.

Warm regards,
CloudScale People Team`,
      subject: 'Next Steps: Backend Developer Screening Call with CloudScale Systems',
      sender: 'talent@cloudscalesystems.io',
      recipient: 'demo.candidate@example.test',
      company: { value: 'CloudScale Systems', confidence: 'clearly_found', sourceText: 'Company: CloudScale Systems' },
      role: { value: 'Backend Developer', confidence: 'clearly_found', sourceText: 'Role: Backend Developer' },
      interviewType: { value: 'Screening', confidence: 'clearly_found', sourceText: 'initial technical screening' },
      interviewDate: { value: 'October 5, 2026', confidence: 'clearly_found', sourceText: 'October 5, 2026' },
      interviewTime: { value: '11:00 AM', confidence: 'clearly_found', sourceText: '11:00 AM' },
      timezone: { value: 'IST', confidence: 'clearly_found', sourceText: 'IST' },
      platform: { value: 'Zoom', confidence: 'clearly_found', sourceText: 'Zoom' },
      meetingLink: 'https://zoom.us/j/9876543210',
      duration: '30 minutes',
      interviewers: [{ name: 'Maya Patel', role: 'Engineering Hiring Manager' }],
      preparationRequirements: [
        'Have your resume handy',
        'Be prepared to discuss FastAPI & REST APIs',
        'Review containerization with Docker',
      ],
      preparationChecklist: [
        { id: 'chk-cs-1', label: 'Resume ready', done: true },
        { id: 'chk-cs-2', label: 'FastAPI design patterns refreshed', done: false },
        { id: 'chk-cs-3', label: 'Docker containerization essentials reviewed', done: false },
      ],
      suggestedPreparation: {
        technical: [
          'FastAPI dependency injection & middleware',
          'REST API error codes & contract design',
          'Docker build optimization & multi-stage Dockerfiles',
        ],
        role: [
          'Explain why FastAPI was chosen over Flask/Django in your project',
          'Describe how you debugged slow queries',
        ],
        company: [
          'Review CloudScale Systems infrastructure architecture overview',
          'Prepare questions on their developer deployment workflow',
        ],
        profileMatchedSkills: ['Python', 'FastAPI', 'REST', 'Docker'],
      },
      deadlines: [],
      attachments: ['None detected'],
      timeline: [
        { label: 'Email Received', date: 'Sep 29, 2026', status: 'completed', detail: 'Screening invitation' },
        { label: 'Screening Interview', date: 'Oct 5, 2026 · 11:00 AM', status: 'upcoming', detail: 'Zoom with Maya Patel' },
        { label: 'Technical Round 1', date: 'TBD', status: 'upcoming', detail: 'Pending screening' },
      ],
      summary: 'Your Backend Developer screening with CloudScale Systems is scheduled for October 5, 2026 at 11:00 AM IST via Zoom. The session is expected to last 30 minutes with Maya Patel.',
      status: 'Upcoming',
      createdAt: '2026-09-29T09:00:00.000Z',
      updatedAt: '2026-09-29T09:00:00.000Z',
    },
  ],
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

