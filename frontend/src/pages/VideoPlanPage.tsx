import { BookOpen, CheckCircle2, FileText, HelpCircle, Lightbulb, Play, Plus, Star, Youtube } from 'lucide-react'
import { useState } from 'react'
import { PageIntro, Panel, StatusPill } from '../components/UI'
import { useProof } from '../context/ProofContext'
import { videoId } from '../services/video'

export function VideoPlanPage() {
  const { state, addVideoNote } = useProof()
  const { video, project } = state
  const [url, setUrl] = useState('https://youtu.be/6iAhu9PYDss')
  const [notesInput, setNotesInput] = useState('')
  const [timestamp] = useState(1102) // simulated current time 18:22
  const id = videoId(url)

  const timeString = (secs: number) => `${String(Math.floor(secs / 3600)).padStart(2, '0')}:${String(Math.floor((secs % 3600) / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`
  
  const currentTopic = 'Python decorators'
  const currentObjective = 'Understand how decorators modify functions and why they are used for things like API authentication.'
  
  const handleAddNote = () => {
    addVideoNote({ timestamp, topic: currentTopic, text: 'New note at ' + timeString(timestamp) })
  }

  return <>
    <PageIntro kicker="VIDEO STUDY PLANNER" title="Watch. Understand. Practice. Prove."> </PageIntro>
    
    <div className="video-layout">
      <div className="video-main">
        <Panel className="video-player-panel">
          <div className="video-url-bar">
            <Youtube size={18} />
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste YouTube URL..." />
          </div>
          <div className="video-embed">
            {id ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}`} title="YouTube learning video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> 
                : <div className="video-invalid">Enter a valid YouTube link.</div>}
          </div>
          
          <div className="video-playback-info">
            <div>
              <span className="eyebrow">CURRENTLY WATCHING</span>
              <h3>{currentTopic}</h3>
            </div>
            <div className="timestamp">{timeString(timestamp)}</div>
          </div>
          
          <div className="video-actions">
            <button className="btn outline" onClick={handleAddNote}><Star size={16}/> Mark important</button>
            <button className="btn outline" onClick={handleAddNote}><FileText size={16}/> Add note</button>
            <button className="btn outline"><HelpCircle size={16}/> Generate question</button>
            <button className="btn outline"><Lightbulb size={16}/> Explain this</button>
          </div>
        </Panel>

        <Panel title="Video Learning Progress" subtitle="Phoenix tracks comprehension, not just watch time.">
          <div className="video-progress-stats">
            <div className="v-stat"><b>{video.watched}%</b><span>WATCHED</span></div>
            <div className="v-stat"><b>{video.understood}%</b><span>UNDERSTOOD</span></div>
            <div className="v-stat"><b>{video.practiced}%</b><span>PRACTICED</span></div>
            <div className="v-stat"><b>{video.applied}%</b><span>APPLIED</span></div>
            <div className="v-stat"><b>{video.proven}%</b><span>PROVEN</span></div>
          </div>
        </Panel>
        
        <Panel title="Daily Planner" subtitle="Adaptive day-by-day plan based on video content.">
          <div className="day-list">
            <div>
              <i>01</i>
              <div><span>DAY 1: Python Fundamentals</span><b>00:00:00 – 01:05:00</b><small>Build one example · 5-question PYQ-style Practice</small></div>
              <CheckCircle2 size={18} className="text-green" />
            </div>
            <div>
              <i>02</i>
              <div><span>DAY 2: Data Structures & Auth</span><b>01:05:00 – 02:40:00</b><small>Includes Python Decorators & JWT</small></div>
              <Play size={18} />
            </div>
          </div>
        </Panel>
      </div>

      <div className="video-side">
        <Panel title="Current Objective" action={<StatusPill state="info">Demo Mode</StatusPill>}>
          <div className="objective-card">
            <BookOpen size={20} />
            <p>{currentObjective}</p>
          </div>
          
          {project && (
            <div className="project-connection">
              <span className="eyebrow">APPLY THIS TO MY PROJECT</span>
              <p>Active Project: <b>{project.name}</b></p>
              <div className="suggestion">
                "Add authentication middleware to the API using decorators."
              </div>
              <button className="btn outline wide"><Plus size={16}/> Add to Project</button>
            </div>
          )}
          
          <div className="practice-section">
            <span className="eyebrow">PYQ-STYLE PRACTICE</span>
            <button className="btn primary wide">Practice this section</button>
          </div>
        </Panel>

        <Panel title="My Notes" subtitle="Click to seek video">
          <div className="notes-timeline">
            {video.notes.map((note) => (
              <div key={note.id} className="note-item">
                <div className="note-time">{timeString(note.timestamp)}</div>
                <div className="note-content">
                  <b>{note.topic}</b>
                  <p>{note.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Content Analysis" subtitle="Source: User Notes / Demo Transcript">
          <textarea rows={4} value={notesInput} onChange={e => setNotesInput(e.target.value)} placeholder="Paste transcript or notes you are authorized to use..." />
          <div className="chapters">
            <b>Detected Topics</b>
            <ul>
              <li>00:00:00 Introduction</li>
              <li>00:18:00 Python Basics</li>
              <li>01:10:00 OOP</li>
              <li>01:35:00 APIs & Decorators</li>
            </ul>
          </div>
        </Panel>
      </div>
    </div>
  </>
}
