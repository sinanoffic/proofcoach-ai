import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, AudioLines, BrainCircuit, CheckCircle2, Clock3, Mic, MicOff, ShieldAlert, Sparkles, Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EvidenceNotice, PageIntro, Panel, StatusPill } from '../components/UI'
import { demoAnswer } from '../data/demo'
import { useProof } from '../context/ProofContext'

const questions = [
  { level: 'D', label: 'EVIDENCE VERIFICATION', reason: 'High-impact quantified claim', text: 'You wrote that you reduced API latency by 35%. What was the original baseline, how did you measure the improvement, and what did you personally change?' },
  { level: 'E', label: 'TRADE-OFFS', reason: 'Ownership visible · trade-off depth weak', text: 'What trade-offs did your caching change introduce, and when would you avoid that approach?' },
]

export function InterviewPage() {
  const { state, setAnswer, submitInterview, startInterview } = useProof(); const nav = useNavigate(); const [listening, setListening] = useState(false); const [seconds, setSeconds] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currentQ, setCurrentQ] = useState(questions[0])
  
  useEffect(() => {
    if (!state.interviewSessionId) {
      fetch('http://localhost:8000/api/interview/start', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: 'Reduced API latency by 35%.', mode: 'Text' })
      }).then(r => r.json()).then(data => {
        if (data.session_id) {
          startInterview(data.session_id)
          setCurrentQ({ level: data.level, label: 'EVIDENCE VERIFICATION', reason: data.reason, text: data.question })
        }
      }).catch(() => {}) // Fallback to demo
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { const timer = window.setInterval(() => setSeconds(s => s + 1), 1000); return () => clearInterval(timer) }, [])
  const speak = () => { if ('speechSynthesis' in window) { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(currentQ.text)) } }
  const listen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) { setListening(false); return }
    const recognition = new SpeechRecognition(); recognition.continuous = true; recognition.interimResults = true
    recognition.onresult = (event: any) => { const text = Array.from(event.results).map((result: any) => result[0].transcript).join(' '); setAnswer(text) }
    recognition.onend = () => setListening(false); recognition.start(); setListening(true)
  }
  const submit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:8000/api/interview/${state.interviewSessionId || 1}/answer`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: state.answer || 'missing' })
      })
      if (!res.ok) throw new Error('API failed')
      const data = await res.json()
      submitInterview(data.evaluation)
      nav('/feedback')
    } catch {
      // Fallback
      submitInterview(null)
      nav('/feedback')
    }
  }
  return <>
    <PageIntro kicker="STEP 04 · ADAPTIVE INTERVIEW" title="Defend the claim—not a memorized answer.">The next probe changes with your demonstrated ownership, evidence, technical depth, and answer structure.</PageIntro>
    <div className="interview-stage">
      <Panel className="interviewer-panel">
        <div className="interviewer-head"><div className="ai-avatar"><img src="/assets/phoenix-watermark.jpg" alt="ProofCoach interviewer" /><span /></div><div><StatusPill state="info">AI INTERVIEWER · {state.candidate.interviewerPersona}</StatusPill><h3>Evidence pressure test</h3><p>Backend Developer · Question {state.currentQuestion + 1} of 3</p></div><div className="interview-timer"><Clock3 /><b>{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</b></div></div>
        <div className="question-level"><span>LEVEL {currentQ.level}</span><div><b>{currentQ.label}</b><small>{currentQ.reason}</small></div><button onClick={speak} aria-label="Read question aloud"><Volume2 /></button></div>
        <AnimatePresence mode="wait"><motion.blockquote key={currentQ.text} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>“{currentQ.text}”</motion.blockquote></AnimatePresence>
        <div className="answer-box"><div><span>YOUR ANSWER</span><span>{state.answer.trim().split(/\s+/).filter(Boolean).length} words</span></div><textarea value={state.answer} onChange={e => setAnswer(e.target.value)} rows={8} placeholder="Structure your answer: baseline → approach → your contribution → measurement → trade-offs" /><div className="answer-actions"><button className={listening ? 'voice-button active' : 'voice-button'} onClick={listen}>{listening ? <MicOff /> : <Mic />}<span><b>{listening ? 'Listening…' : 'Voice answer'}</b><small>{(window as any).webkitSpeechRecognition || (window as any).SpeechRecognition ? 'Browser speech recognition' : 'Unavailable — use text fallback'}</small></span></button><button className="btn primary" onClick={submit} disabled={!state.answer.trim() || loading}>{loading ? 'Analyzing...' : 'Submit evidence'} <ArrowRight /></button></div></div>
        <button className="demo-answer" onClick={() => setAnswer(demoAnswer)}><Sparkles />Use seeded demo answer</button>
      </Panel>
      <aside className="interview-side">
        <Panel title="What is being observed" subtitle="Communication indicators—not emotion or facial analysis.">
          <div className="indicator-list"><span><AudioLines /><b>Answer duration</b><i>observable</i></span><span><BrainCircuit /><b>Relevance & completeness</b><i>content</i></span><span><CheckCircle2 /><b>Answer structure</b><i>content</i></span><span><Mic /><b>Filler / repeated words</b><i>speech only</i></span></div>
        </Panel>
        <Panel title="Adaptive route"><div className="adaptive-map"><span><i className="green" />Strong answer<b>Harder question</b></span><span><i className="amber" />Weak answer<b>Clarification</b></span><span><i className="red" />Unsupported claim<b>Evidence challenge</b></span><span><i className="blue" />Weak structure<b>Communication follow-up</b></span></div></Panel>
        <EvidenceNotice>ProofCoach evaluates what you demonstrate in this session. It does not use facial analysis and does not independently verify real-world events.</EvidenceNotice>
        <div className="privacy-box"><ShieldAlert /><span><b>Text fallback always available</b><small>Voice features depend on browser support.</small></span></div>
      </aside>
    </div>
  </>
}

