import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  Check,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Clock,
  Eye,
  FileSearch,
  FileText,
  Filter,
  GraduationCap,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Square,
  Trash2,
  UploadCloud,
  User,
  Video,
  X,
} from 'lucide-react'
import { useId, useMemo, useRef, useState } from 'react'
import { Panel, StatusPill } from '../UI'
import { useProof } from '../../context/ProofContext'
import { processEmailIntelligence } from '../../services/emailIntelligence'
import type {
  ConfidenceLevel,
  InterviewEmail,
  InterviewEmailStatus,
  InterviewPlatform,
  InterviewType,
} from '../../types'

const SAMPLE_PASTE_TEXT = `Subject: Invitation: Machine Learning Intern Technical Interview @ ABC Technologies
From: recruiting@abctechnologies.com
To: candidate@example.test
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
ABC Technologies`

function ConfidenceBadge({ confidence }: { confidence: ConfidenceLevel }) {
  if (confidence === 'clearly_found') {
    return <span className="confidence-badge found" title="Confirmed fact in email text"><Check size={12} /> Found in email</span>
  }
  if (confidence === 'inferred') {
    return <span className="confidence-badge inferred" title="Inferred based on contextual keywords"><AlertTriangle size={12} /> Inferred</span>
  }
  return <span className="confidence-badge missing" title="Not specified in email"><AlertCircle size={12} /> Not specified</span>
}

export function InterviewEmailIntelligence({ onSelectEmail }: { onSelectEmail?: (email: InterviewEmail) => void }) {
  const {
    state,
    addInterviewEmail,
    updateInterviewEmail,
    deleteInterviewEmail,
    setInterviewEmailStatus,
    togglePreparationChecklist,
  } = useProof()

  const emails = useMemo(() => state.interviewEmails ?? [], [state.interviewEmails])
  const candidate = state.candidate

  const [activeId, setActiveId] = useState<string | null>(emails[0]?.id || null)
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isViewingOriginal, setIsViewingOriginal] = useState(false)

  // Upload/Input states
  const [inputMethod, setInputMethod] = useState<'upload' | 'paste'>('paste')
  const [pasteText, setPasteText] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [errorNotice, setErrorNotice] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const searchInputId = useId()

  const selectedEmail = useMemo(() => {
    return emails.find(e => e.id === activeId) || null
  }, [emails, activeId])

  const filteredEmails = useMemo(() => {
    return emails.filter(e => {
      const matchesFilter = filterStatus === 'All' || e.status === filterStatus
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        e.company.value.toLowerCase().includes(q) ||
        e.role.value.toLowerCase().includes(q) ||
        e.interviewType.value.toLowerCase().includes(q) ||
        e.platform.value.toLowerCase().includes(q)
      return matchesFilter && matchesSearch
    })
  }, [emails, filterStatus, searchQuery])

  // Handlers for Upload/Paste
  const handleAnalyze = async () => {
    setErrorNotice(null)
    setIsAnalyzing(true)
    try {
      const result = await processEmailIntelligence({
        file: inputMethod === 'upload' ? selectedFile || undefined : undefined,
        text: inputMethod === 'paste' ? pasteText : undefined,
        candidate,
      })
      addInterviewEmail(result)
      setActiveId(result.id)
      setIsAdding(false)
      setPasteText('')
      setSelectedFile(null)
      if (onSelectEmail) onSelectEmail(result)
    } catch (err: any) {
      setErrorNotice(err.message || 'Failed to analyze email. Please review the input and try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files?.[0]) {
      const f = e.dataTransfer.files[0]
      if (/\.(pdf|docx|txt|eml)$/i.test(f.name)) {
        setSelectedFile(f)
        setErrorNotice(null)
      } else {
        setErrorNotice('Unsupported file format. Please upload a PDF, DOCX, or TXT file.')
      }
    }
  }

  const handleLoadSample = () => {
    setInputMethod('paste')
    setPasteText(SAMPLE_PASTE_TEXT)
    setErrorNotice(null)
  }

  return (
    <div className="interview-emails-section">
      {/* Top Banner & Control Bar */}
      <div className="email-intel-header">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> PROFILE · EMAIL INTELLIGENCE</span>
          <h2>Interview Email Intelligence</h2>
          <p>
            Upload or paste interview invitations to extract schedules, meeting links, preparation requirements, and role intelligence.
          </p>
        </div>
        <div className="email-intel-top-actions">
          {!isAdding && (
            <button className="btn primary" onClick={() => { setIsAdding(true); setErrorNotice(null) }}>
              <Plus size={16} /> Analyze Interview Email
            </button>
          )}
        </div>
      </div>

      {/* Input / Upload Interface (when Adding) */}
      {isAdding && (
        <Panel className="email-input-panel" title="Analyze New Interview Email" subtitle="Extract dates, meeting platforms, instructions, and preparation checkpoints locally.">
          <div className="input-method-tabs">
            <button
              type="button"
              className={`tab-btn ${inputMethod === 'paste' ? 'active' : ''}`}
              onClick={() => { setInputMethod('paste'); setErrorNotice(null) }}
            >
              <FileText size={16} /> Option B: Paste Email
            </button>
            <button
              type="button"
              className={`tab-btn ${inputMethod === 'upload' ? 'active' : ''}`}
              onClick={() => { setInputMethod('upload'); setErrorNotice(null) }}
            >
              <UploadCloud size={16} /> Option A: Upload Email File (PDF, DOCX, TXT)
            </button>
          </div>

          {inputMethod === 'paste' ? (
            <div className="paste-area-box">
              <div className="paste-area-head">
                <label htmlFor="email-paste-textarea">Paste your complete interview email:</label>
                <button type="button" className="text-link" onClick={handleLoadSample}>
                  Load realistic sample email
                </button>
              </div>
              <textarea
                id="email-paste-textarea"
                rows={10}
                className="email-textarea"
                placeholder="Paste your interview email here (Subject, Sender, Date, Body, Preparation instructions)..."
                value={pasteText}
                onChange={e => setPasteText(e.target.value)}
              />
              <small className="char-count">{pasteText.length} characters · processed with local privacy</small>
            </div>
          ) : (
            <div className="upload-area-box">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt,.eml"
                hidden
                onChange={e => {
                  if (e.target.files?.[0]) {
                    setSelectedFile(e.target.files[0])
                    setErrorNotice(null)
                  }
                }}
              />
              <div
                className={`dropzone ${isDragging ? 'dragging' : ''}`}
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud size={36} />
                <b>{selectedFile ? selectedFile.name : 'Drop your interview email here'}</b>
                <span>PDF, DOCX, or TXT · Maximum 8 MB</span>
                <button type="button" className="btn outline" onClick={e => { e.stopPropagation(); fileInputRef.current?.click() }}>
                  Browse files
                </button>
              </div>
              {selectedFile && (
                <div className="selected-file-pill">
                  <FileText size={16} />
                  <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                  <button type="button" onClick={() => setSelectedFile(null)} aria-label="Remove selected file"><X size={14} /></button>
                </div>
              )}
            </div>
          )}

          {errorNotice && (
            <div className="error-alert">
              <AlertCircle size={16} />
              <span>{errorNotice}</span>
            </div>
          )}

          <div className="input-action-bar">
            <button className="btn ghost" onClick={() => { setIsAdding(false); setErrorNotice(null) }} disabled={isAnalyzing}>
              Cancel
            </button>
            <button
              className="btn primary"
              onClick={handleAnalyze}
              disabled={isAnalyzing || (inputMethod === 'paste' ? !pasteText.trim() : !selectedFile)}
            >
              {isAnalyzing ? (
                <><RefreshCw className="spin" size={16} /> Analyzing email…</>
              ) : (
                <><Sparkles size={16} /> Analyze Interview Email</>
              )}
            </button>
          </div>
        </Panel>
      )}

      {/* Main Workspace: Collections Grid + Selected Detail View */}
      <div className="email-intel-workspace">
        {/* Collection Sidebar / Cards List */}
        <aside className="email-collection-column">
          <div className="collection-header">
            <div className="collection-title-row">
              <h3>Interview Invitations</h3>
              <span className="count-pill">{emails.length}</span>
            </div>
            <div className="search-filter-box">
              <div className="search-input-wrap">
                <Search size={15} />
                <label htmlFor={searchInputId} className="sr-only">Search interview emails</label>
                <input
                  id={searchInputId}
                  type="text"
                  placeholder="Search role, company, or platform..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button type="button" className="clear-btn" onClick={() => setSearchQuery('')} aria-label="Clear search input">
                    <X size={13} />
                  </button>
                )}
              </div>
              <div className="status-filter-pills" role="tablist" aria-label="Filter emails by status">
                {['All', 'Upcoming', 'Today', 'Completed', 'Needs Review'].map(st => (
                  <button
                    key={st}
                    type="button"
                    role="tab"
                    aria-selected={filterStatus === st}
                    className={`filter-pill ${filterStatus === st ? 'active' : ''}`}
                    onClick={() => setFilterStatus(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="email-cards-list">
            {filteredEmails.length === 0 ? (
              <div className="empty-collection-state">
                <Filter size={24} />
                <p>No interview emails match your filter.</p>
                {emails.length === 0 ? (
                  <button className="btn outline" onClick={() => setIsAdding(true)}>
                    <Plus size={15} /> Add first interview email
                  </button>
                ) : (
                  <button className="btn ghost" onClick={() => { setFilterStatus('All'); setSearchQuery('') }}>
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              filteredEmails.map(item => {
                const isSelected = item.id === activeId
                return (
                  <div
                    key={item.id}
                    className={`email-summary-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setActiveId(item.id)}
                  >
                    <div className="card-top">
                      <span className="role-heading">{item.role.value}</span>
                      <StatusPill state={item.status === 'Completed' ? 'pass' : item.status === 'Needs Review' ? 'warn' : 'info'}>
                        {item.status.toUpperCase()}
                      </StatusPill>
                    </div>
                    <div className="card-company">{item.company.value}</div>
                    <div className="card-meta">
                      <span><Calendar size={13} /> {item.interviewDate.value}</span>
                      {item.interviewTime.value !== 'Not specified' && (
                        <span><Clock size={13} /> {item.interviewTime.value} {item.timezone.value}</span>
                      )}
                    </div>
                    <div className="card-type-pill">
                      <span>{item.interviewType.value}</span>
                      {item.platform.value !== 'Unknown' && <i>• {item.platform.value}</i>}
                    </div>
                    <div className="card-foot-actions">
                      <button className="btn ghost small" onClick={e => { e.stopPropagation(); setActiveId(item.id) }}>
                        View Details <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </aside>

        {/* Selected Interview Detail View */}
        <main className="email-detail-column">
          {selectedEmail ? (
            <div className="email-detail-container">
              {/* Summary Banner */}
              <div className="email-summary-banner">
                <Sparkles size={18} />
                <div>
                  <b>Email Summary</b>
                  <p>{selectedEmail.summary}</p>
                </div>
              </div>

              {/* 5. INTERVIEW ACTION CARD ("YOUR INTERVIEW") */}
              <div className="your-interview-hero-card">
                <div className="action-card-header">
                  <div>
                    <span className="action-tag">YOUR INTERVIEW</span>
                    <h2>{selectedEmail.role.value}</h2>
                    <h3 className="company-title">{selectedEmail.company.value}</h3>
                  </div>
                  <div className="status-changer">
                    <select
                      value={selectedEmail.status}
                      aria-label="Change interview status"
                      onChange={e => setInterviewEmailStatus(selectedEmail.id, e.target.value as InterviewEmailStatus)}
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Today">Today</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Needs Review">Needs Review</option>
                    </select>
                  </div>
                </div>

                <div className="action-card-grid">
                  <div className="action-stat">
                    <Calendar size={18} />
                    <div>
                      <small>DATE</small>
                      <b>{selectedEmail.interviewDate.value}</b>
                    </div>
                  </div>
                  <div className="action-stat">
                    <Clock size={18} />
                    <div>
                      <small>TIME</small>
                      <b>{selectedEmail.interviewTime.value} {selectedEmail.timezone.value}</b>
                    </div>
                  </div>
                  <div className="action-stat">
                    <Video size={18} />
                    <div>
                      <small>PLATFORM</small>
                      <b>{selectedEmail.platform.value}</b>
                    </div>
                  </div>
                  {selectedEmail.duration && (
                    <div className="action-stat">
                      <Clock size={18} />
                      <div>
                        <small>DURATION</small>
                        <b>{selectedEmail.duration}</b>
                      </div>
                    </div>
                  )}
                </div>

                {selectedEmail.meetingLink && (
                  <div className="join-interview-row">
                    <a
                      href={selectedEmail.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn primary large join-btn"
                    >
                      <Video size={18} /> Join Interview
                    </a>
                    <span className="link-preview">{selectedEmail.meetingLink}</span>
                  </div>
                )}

                {/* Interactive Preparation Checklist */}
                {selectedEmail.preparationChecklist.length > 0 && (
                  <div className="prep-checklist-box">
                    <div className="checklist-head">
                      <h4>Preparation Required</h4>
                      <small>Extracted directly from email instructions</small>
                    </div>
                    <div className="checklist-items">
                      {selectedEmail.preparationChecklist.map(chk => (
                        <button
                          key={chk.id}
                          type="button"
                          className={`checklist-item ${chk.done ? 'checked' : ''}`}
                          onClick={() => togglePreparationChecklist(selectedEmail.id, chk.id)}
                        >
                          {chk.done ? <CheckSquare size={17} className="check-icon" /> : <Square size={17} className="box-icon" />}
                          <span>{chk.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 6. IMPORTANT EMAIL DETAILS (with confidence indicators) */}
              <Panel title="Interview Details" subtitle="Verified extraction with transparent confidence markers." className="details-panel">
                <div className="details-table-grid">
                  <div className="detail-field">
                    <span>Company</span>
                    <b>{selectedEmail.company.value}</b>
                    <ConfidenceBadge confidence={selectedEmail.company.confidence} />
                  </div>
                  <div className="detail-field">
                    <span>Role</span>
                    <b>{selectedEmail.role.value}</b>
                    <ConfidenceBadge confidence={selectedEmail.role.confidence} />
                  </div>
                  <div className="detail-field">
                    <span>Interview Type</span>
                    <b>{selectedEmail.interviewType.value}</b>
                    <ConfidenceBadge confidence={selectedEmail.interviewType.confidence} />
                  </div>
                  <div className="detail-field">
                    <span>Date</span>
                    <b>{selectedEmail.interviewDate.value}</b>
                    <ConfidenceBadge confidence={selectedEmail.interviewDate.confidence} />
                  </div>
                  <div className="detail-field">
                    <span>Time</span>
                    <b>{selectedEmail.interviewTime.value}</b>
                    <ConfidenceBadge confidence={selectedEmail.interviewTime.confidence} />
                  </div>
                  <div className="detail-field">
                    <span>Timezone</span>
                    <b>{selectedEmail.timezone.value}</b>
                    <ConfidenceBadge confidence={selectedEmail.timezone.confidence} />
                  </div>
                  <div className="detail-field">
                    <span>Platform</span>
                    <b>{selectedEmail.platform.value}</b>
                    <ConfidenceBadge confidence={selectedEmail.platform.confidence} />
                  </div>
                  {selectedEmail.location && (
                    <div className="detail-field">
                      <span>Location</span>
                      <b>{selectedEmail.location}</b>
                      <ConfidenceBadge confidence="clearly_found" />
                    </div>
                  )}
                  {selectedEmail.duration && (
                    <div className="detail-field">
                      <span>Duration</span>
                      <b>{selectedEmail.duration}</b>
                      <ConfidenceBadge confidence="clearly_found" />
                    </div>
                  )}
                  {selectedEmail.interviewers.length > 0 && (
                    <div className="detail-field">
                      <span>Interviewer</span>
                      <b>{selectedEmail.interviewers.map(i => `${i.name}${i.role ? ` (${i.role})` : ''}`).join(', ')}</b>
                      <ConfidenceBadge confidence="clearly_found" />
                    </div>
                  )}
                </div>
              </Panel>

              {/* 7. PREPARATION INTELLIGENCE (Technical, Role, Company + Profile Connection) */}
              <Panel
                title="Prepare For This Interview"
                subtitle="Categorized intelligence connecting email requirements with your profile skills."
                className="prep-panel"
              >
                {/* Profile Connection Callout */}
                {selectedEmail.suggestedPreparation.profileMatchedSkills.length > 0 && (
                  <div className="profile-match-callout">
                    <ShieldCheck size={20} />
                    <div>
                      <b>Profile Skill Alignment</b>
                      <p>
                        Your profile lists{' '}
                        <strong>{selectedEmail.suggestedPreparation.profileMatchedSkills.join(', ')}</strong> as strengths.
                        These match the topics expected for a {selectedEmail.role.value} interview.
                      </p>
                    </div>
                  </div>
                )}

                <div className="prep-columns-grid">
                  <div className="prep-col">
                    <div className="col-header"><GraduationCap size={16} /><b>Technical Preparation</b></div>
                    <ul>
                      {selectedEmail.suggestedPreparation.technical.map(t => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="prep-col">
                    <div className="col-header"><FileSearch size={16} /><b>Role & Project Defense</b></div>
                    <ul>
                      {selectedEmail.suggestedPreparation.role.map(r => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="prep-col">
                    <div className="col-header"><User size={16} /><b>Company Preparation</b></div>
                    <ul>
                      {selectedEmail.suggestedPreparation.company.map(c => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="disclaimer-note">
                  <AlertCircle size={14} />
                  <span>
                    <strong>Distinction:</strong> Preparation items above are recommended suggestions based on your target role. Items in the Checklist above represent strict email requirements.
                  </span>
                </div>
              </Panel>

              {/* 9. INTERVIEW TIMELINE */}
              {selectedEmail.timeline.length > 0 && (
                <Panel title="Interview Timeline" subtitle="Milestones determined from your email communication." className="timeline-panel">
                  <div className="timeline-steps-list">
                    {selectedEmail.timeline.map((step, idx) => (
                      <div key={step.label} className={`timeline-step ${step.status}`}>
                        <div className="step-marker">
                          {step.status === 'completed' ? <Check size={14} /> : <span>0{idx + 1}</span>}
                        </div>
                        <div className="step-content">
                          <div className="step-title-row">
                            <b>{step.label}</b>
                            {step.date && <small>{step.date}</small>}
                          </div>
                          {step.detail && <p>{step.detail}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
              )}

              {/* Bottom Actions Bar */}
              <div className="email-bottom-bar">
                <div className="left-actions">
                  <button className="btn outline" onClick={() => setIsViewingOriginal(true)}>
                    <Eye size={16} /> View Original Email
                  </button>
                  <button className="btn outline" onClick={() => setIsEditing(true)}>
                    <Pencil size={16} /> Edit Details
                  </button>
                </div>
                <div className="right-actions">
                  {selectedEmail.status !== 'Completed' ? (
                    <button
                      className="btn outline"
                      onClick={() => setInterviewEmailStatus(selectedEmail.id, 'Completed')}
                    >
                      <CheckCircle2 size={16} /> Mark as Completed
                    </button>
                  ) : (
                    <button
                      className="btn outline"
                      onClick={() => setInterviewEmailStatus(selectedEmail.id, 'Upcoming')}
                    >
                      Re-open Interview
                    </button>
                  )}
                  <button
                    className="btn danger"
                    onClick={() => {
                      if (window.confirm(`Delete interview email for ${selectedEmail.role.value} at ${selectedEmail.company.value}?`)) {
                        deleteInterviewEmail(selectedEmail.id)
                        const remaining = emails.filter(e => e.id !== selectedEmail.id)
                        setActiveId(remaining[0]?.id || null)
                      }
                    }}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-email-selected">
              <FileSearch size={32} />
              <h3>No interview email selected</h3>
              <p>Choose an invitation from the left or analyze a new email to see structured intelligence.</p>
              <button className="btn primary" onClick={() => setIsAdding(true)}>
                <Plus size={16} /> Analyze New Email
              </button>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: VIEW ORIGINAL EMAIL */}
      {isViewingOriginal && selectedEmail && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsViewingOriginal(false)}>
          <div className="original-email-modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="eyebrow">VERBATIM COMMUNICATION</span>
                <h3>Original Interview Email</h3>
              </div>
              <button className="btn ghost" onClick={() => setIsViewingOriginal(false)} aria-label="Close original email modal">
                <X size={18} />
              </button>
            </div>
            <div className="email-meta-strip">
              {selectedEmail.subject && <div><span>Subject:</span> <b>{selectedEmail.subject}</b></div>}
              {selectedEmail.sender && <div><span>From:</span> <b>{selectedEmail.sender}</b></div>}
              {selectedEmail.recipient && <div><span>To:</span> <b>{selectedEmail.recipient}</b></div>}
              {selectedEmail.fileName && <div><span>Source File:</span> <b>{selectedEmail.fileName}</b></div>}
            </div>
            <div className="original-email-body">
              <pre>{selectedEmail.originalEmail}</pre>
            </div>
            <div className="modal-foot">
              <button className="btn primary" onClick={() => setIsViewingOriginal(false)}>
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT EXTRACTED DETAILS */}
      {isEditing && selectedEmail && (
        <EditEmailModal
          email={selectedEmail}
          onClose={() => setIsEditing(false)}
          onSave={updates => {
            updateInterviewEmail(selectedEmail.id, updates)
            setIsEditing(false)
          }}
        />
      )}
    </div>
  )
}

function EditEmailModal({
  email,
  onClose,
  onSave,
}: {
  email: InterviewEmail
  onClose: () => void
  onSave: (updates: Partial<InterviewEmail>) => void
}) {
  const [company, setCompany] = useState(email.company.value)
  const [role, setRole] = useState(email.role.value)
  const [interviewType, setInterviewType] = useState<InterviewType>(email.interviewType.value)
  const [date, setDate] = useState(email.interviewDate.value)
  const [time, setTime] = useState(email.interviewTime.value)
  const [timezone, setTimezone] = useState(email.timezone.value)
  const [platform, setPlatform] = useState<InterviewPlatform>(email.platform.value)
  const [meetingLink, setMeetingLink] = useState(email.meetingLink || '')
  const [location, setLocation] = useState(email.location || '')
  const [duration, setDuration] = useState(email.duration || '')
  const [interviewerName, setInterviewerName] = useState(email.interviewers[0]?.name || '')
  const [interviewerRole, setInterviewerRole] = useState(email.interviewers[0]?.role || '')
  const [status, setStatus] = useState<InterviewEmailStatus>(email.status)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      company: { value: company.trim() || 'Unknown Company', confidence: 'clearly_found' },
      role: { value: role.trim() || 'Candidate Role', confidence: 'clearly_found' },
      interviewType: { value: interviewType, confidence: 'clearly_found' },
      interviewDate: { value: date.trim() || 'Not specified', confidence: date.trim() ? 'clearly_found' : 'not_found' },
      interviewTime: { value: time.trim() || 'Not specified', confidence: time.trim() ? 'clearly_found' : 'not_found' },
      timezone: { value: timezone.trim() || 'IST', confidence: 'clearly_found' },
      platform: { value: platform, confidence: 'clearly_found' },
      meetingLink: meetingLink.trim() || undefined,
      location: location.trim() || undefined,
      duration: duration.trim() || undefined,
      interviewers: interviewerName.trim() ? [{ name: interviewerName.trim(), role: interviewerRole.trim() || undefined }] : [],
      status,
    })
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="edit-email-modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span className="eyebrow">MANUAL CORRECTION</span>
            <h3>Edit Extracted Interview Details</h3>
          </div>
          <button className="btn ghost" onClick={onClose} aria-label="Close edit details modal"><X size={18} /></button>
        </div>

        <form onSubmit={handleSave} className="edit-form-grid">
          <label>
            <span>Company Name</span>
            <input type="text" value={company} onChange={e => setCompany(e.target.value)} required />
          </label>

          <label>
            <span>Role / Position</span>
            <input type="text" value={role} onChange={e => setRole(e.target.value)} required />
          </label>

          <label>
            <span>Interview Type</span>
            <select value={interviewType} onChange={e => setInterviewType(e.target.value as InterviewType)}>
              <option value="Technical Interview">Technical Interview</option>
              <option value="Coding Interview">Coding Interview</option>
              <option value="HR Interview">HR Interview</option>
              <option value="Behavioral Interview">Behavioral Interview</option>
              <option value="Managerial Interview">Managerial Interview</option>
              <option value="Assessment">Assessment</option>
              <option value="Screening">Screening</option>
              <option value="Panel Interview">Panel Interview</option>
              <option value="Video Interview">Video Interview</option>
              <option value="Phone Interview">Phone Interview</option>
              <option value="On-site Interview">On-site Interview</option>
              <option value="Unknown">Unknown</option>
            </select>
          </label>

          <label>
            <span>Interview Date</span>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. October 3, 2026" />
          </label>

          <label>
            <span>Interview Time</span>
            <input type="text" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 2:00 PM" />
          </label>

          <label>
            <span>Timezone</span>
            <input type="text" value={timezone} onChange={e => setTimezone(e.target.value)} placeholder="e.g. IST" />
          </label>

          <label>
            <span>Platform</span>
            <select value={platform} onChange={e => setPlatform(e.target.value as InterviewPlatform)}>
              <option value="Google Meet">Google Meet</option>
              <option value="Zoom">Zoom</option>
              <option value="Microsoft Teams">Microsoft Teams</option>
              <option value="Phone">Phone</option>
              <option value="In-person">In-person</option>
              <option value="Unknown">Unknown</option>
            </select>
          </label>

          <label>
            <span>Duration</span>
            <input type="text" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 45 minutes" />
          </label>

          <label className="span-2">
            <span>Meeting Link / URL</span>
            <input type="url" value={meetingLink} onChange={e => setMeetingLink(e.target.value)} placeholder="https://meet.google.com/..." />
          </label>

          <label className="span-2">
            <span>Physical Location / Office Venue</span>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Optional office location" />
          </label>

          <label>
            <span>Interviewer Name</span>
            <input type="text" value={interviewerName} onChange={e => setInterviewerName(e.target.value)} placeholder="e.g. Dr. Rajesh Sharma" />
          </label>

          <label>
            <span>Interviewer Title / Role</span>
            <input type="text" value={interviewerRole} onChange={e => setInterviewerRole(e.target.value)} placeholder="e.g. Lead AI Scientist" />
          </label>

          <label>
            <span>Status</span>
            <select value={status} onChange={e => setStatus(e.target.value as InterviewEmailStatus)}>
              <option value="Upcoming">Upcoming</option>
              <option value="Today">Today</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Needs Review">Needs Review</option>
            </select>
          </label>

          <div className="form-action-bar span-2">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )
}
