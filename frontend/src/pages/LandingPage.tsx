import { motion } from 'framer-motion'
import { ArrowRight, Check, FileSearch, GitBranch, LockKeyhole, Mic2, ShieldCheck, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Brand, PhoenixWatermark } from '../components/Brand'
import { useProof } from '../context/ProofContext'

export function LandingPage() {
  const navigate = useNavigate(); const { resetDemo } = useProof()
  const runDemo = () => { resetDemo(); navigate('/resume') }
  return <div className="landing">
    <nav className="landing-nav"><Brand /><div><span className="landing-local"><ShieldCheck size={15} />Local-first prototype</span><button className="btn ghost" onClick={() => navigate('/onboarding')}>Private setup</button></div></nav>
    <main className="hero">
      <PhoenixWatermark className="hero-phoenix" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
        <span className="hero-chip"><Sparkles size={15} /> CAREER EVIDENCE ENGINE</span>
        <h1>Build it.<br /><em>Prove it.</em> Defend it.</h1>
        <p>Make your resume machine-readable. Connect every important claim to evidence. Practice until you can defend your work under pressure.</p>
        <div className="hero-actions"><button className="btn primary large" onClick={runDemo}>Run deterministic demo <ArrowRight size={19} /></button><button className="btn outline large" onClick={() => navigate('/onboarding')}>Set up my profile</button></div>
        <div className="hero-trust"><span><Check />No cloud AI required</span><span><Check />No universal ATS score</span><span><Check />No invented achievements</span></div>
      </motion.div>
      <motion.div className="hero-console" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6, delay: .1 }}>
        <div className="console-head"><span className="pulse-dot" /> LIVE EVIDENCE PATH <small>DEMO</small></div>
        <div className="proof-chain">
          <div><FileSearch /><span><small>RESUME CLAIM</small><b>Reduced API latency by 35%</b></span><i className="amber">VERIFY</i></div>
          <span className="chain-line" />
          <div><GitBranch /><span><small>PROJECT EVIDENCE</small><b>Flood Prediction API</b></span><i className="green">FOUND</i></div>
          <span className="chain-line" />
          <div><Mic2 /><span><small>INTERVIEW PROBE</small><b>Baseline? Measurement? Trade-offs?</b></span><i className="blue">READY</i></div>
          <span className="chain-line" />
          <div><LockKeyhole /><span><small>EVIDENCE LOCK</small><b>Unsupported metrics blocked</b></span><i className="green">ACTIVE</i></div>
        </div>
        <div className="console-score"><span>Claim confidence</span><b>58 <i>→</i> 82</b><small>demonstrated understanding, not external proof</small></div>
      </motion.div>
    </main>
    <div className="landing-strip"><span>Parser Robustness</span><b>→</b><span>Evidence Graph</span><b>→</b><span>Adaptive Interview</span><b>→</b><span>Evidence Lock</span><b>→</b><span>Growth Plan</span></div>
  </div>
}

