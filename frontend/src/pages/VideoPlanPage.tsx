import { CalendarDays, Clock3, FileText, Play, Sparkles, Youtube } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageIntro, Panel, StatusPill } from '../components/UI'

export function VideoPlanPage() {
  const [url, setUrl] = useState('https://youtu.be/6iAhu9PYDss?si=Q1rUGJdmA0S03oWM'); const [duration, setDuration] = useState(900); const [notes, setNotes] = useState('')
  const days = useMemo(() => Math.ceil(duration / 112), [duration]); const sessions = Array.from({ length: Math.min(days, 6) }, (_, index) => ({ day: index + 1, start: index * 112, end: Math.min(duration, (index + 1) * 112) }))
  const time = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
  return <>
    <PageIntro kicker="VIDEO STUDY PLANNER" title="Turn a long course into daily evidence.">ProofCoach embeds the official YouTube player. It does not download copyrighted video files.</PageIntro>
    <div className="video-grid">
      <Panel title="Course input" subtitle="YouTube URL + authorized transcript or your own notes.">
        <label>YouTube URL<div className="input-icon"><Youtube /><input value={url} onChange={e => setUrl(e.target.value)} /></div></label>
        <div className="video-embed"><iframe src="https://www.youtube.com/embed/6iAhu9PYDss" title="Demo learning video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
        <label>Course duration <b>{Math.floor(duration / 60)}h {duration % 60}m</b><input type="range" min="600" max="1200" step="30" value={duration} onChange={e => setDuration(Number(e.target.value))} /></label>
        <label>Paste transcript / notes <small>optional</small><textarea rows={5} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Paste transcript or notes you are authorized to use. ProofCoach will extract topics, concepts, objectives, and quiz themes." /></label>
      </Panel>
      <Panel title={`${days}-day study route`} subtitle="2h 30m/day · 75% learning · 25% practice" action={<StatusPill state="info">ADAPTIVE</StatusPill>}>
        <div className="plan-summary"><span><CalendarDays /><b>{days} days</b><small>to complete</small></span><span><Clock3 /><b>112 min</b><small>video / day</small></span><span><Sparkles /><b>38 min</b><small>practice / day</small></span></div>
        <div className="day-list">{sessions.map(session => <div key={session.day}><i>{String(session.day).padStart(2, '0')}</i><div><span>DAY {session.day}</span><b>{time(session.start)} – {time(session.end)} video</b><small>Build one example · 5-question PYQ-style Practice · 3 recall notes</small></div><Play /></div>)}</div>
        {days > 6 && <div className="more-days">+ {days - 6} more sessions generated with the same daily evidence cycle</div>}
        <div className="transcript-note"><FileText /><span><b>{notes ? 'Notes ready for topic extraction' : 'No authorized transcript supplied'}</b><small>{notes ? 'Concepts will come from your supplied material.' : 'Paste transcript / notes for exact topic extraction.'}</small></span></div>
      </Panel>
    </div>
  </>
}

