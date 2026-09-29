import { describe, expect, it } from 'vitest'
import {
  extractCompany,
  extractMeetingLink,
  extractRole,
  parseEmailLocally,
} from './emailIntelligence'

const SAMPLE_EMAIL = `Subject: Invitation: Machine Learning Intern Technical Interview @ ABC Technologies
From: recruiting@abctechnologies.com
To: candidate@example.test
Date: September 28, 2026

Dear Candidate,

We would like to invite you for a 45-minute Technical Interview for the Machine Learning Intern position at ABC Technologies.

Interview Details:
- Date: October 3, 2026
- Time: 2:00 PM IST
- Platform: Google Meet
- Link: https://meet.google.com/abc-defg-hij
- Interviewer: Dr. Rajesh Sharma, Lead AI Scientist

Preparation Instructions:
- Have a copy of your resume ready.
- Prepare to discuss your machine learning and backend project architecture.
- Live problem-solving in Python.

Best regards,
Talent Team`

describe('emailIntelligence', () => {
  it('extracts Google Meet links correctly', () => {
    const { link, platform } = extractMeetingLink('Join at https://meet.google.com/abc-defg-hij please')
    expect(link).toBe('https://meet.google.com/abc-defg-hij')
    expect(platform).toBe('Google Meet')
  })

  it('extracts company and role with high confidence', () => {
    const company = extractCompany(SAMPLE_EMAIL)
    expect(company.value).toBe('ABC Technologies')
    expect(company.confidence).toBe('clearly_found')

    const role = extractRole(SAMPLE_EMAIL)
    expect(role.value).toBe('Machine Learning Intern')
    expect(role.confidence).toBe('clearly_found')
  })

  it('parses complete email into structured InterviewEmail object', () => {
    const res = parseEmailLocally(SAMPLE_EMAIL)
    expect(res.company.value).toBe('ABC Technologies')
    expect(res.role.value).toBe('Machine Learning Intern')
    expect(res.interviewType.value).toBe('Technical Interview')
    expect(res.interviewDate.value).toBe('October 3, 2026')
    expect(res.interviewTime.value).toBe('2:00 PM')
    expect(res.timezone.value).toBe('IST')
    expect(res.platform.value).toBe('Google Meet')
    expect(res.meetingLink).toBe('https://meet.google.com/abc-defg-hij')
    expect(res.duration).toBe('45 minutes')
    expect(res.interviewers[0].name).toContain('Dr. Rajesh Sharma')
    expect(res.preparationChecklist.length).toBeGreaterThan(0)
    expect(res.status).toBe('Upcoming')
    expect(res.summary).toContain('Machine Learning Intern')
    expect(res.summary).toContain('ABC Technologies')
  })

  it('marks missing date as not_found and flags Needs Review status', () => {
    const partialEmail = `Subject: Quick chat
From: team@startup.io

Hi! Let us know when you are free for an intro chat for Software Engineer at Startup.
`
    const res = parseEmailLocally(partialEmail)
    expect(res.interviewDate.confidence).toBe('not_found')
    expect(res.status).toBe('Needs Review')
  })
})
