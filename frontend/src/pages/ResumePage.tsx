import { AlertTriangle, FileText, LockKeyhole, ScanText, UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'
import { DemoPath } from '../components/Shell'
import { PageIntro, Panel, ScoreRing, StatusPill } from '../components/UI'
import { parserChecks } from '../data/demo'
import { parseResume } from '../services/api'

export function ResumePage() {
  const input = useRef<HTMLInputElement>(null); const [file, setFile] = useState('proofcoach-demo-resume.pdf'); const [status, setStatus] = useState('Demo resume analyzed locally.'); const [busy, setBusy] = useState(false)
  const upload = async (selected?: File) => {
    if (!selected) return; setFile(selected.name); setBusy(true); setStatus('Parsing through the local backend…')
    try { const result = await parseResume(selected); setStatus(`Local parse complete: ${String(result.parser_robustness)} / 100`) }
    catch { setStatus('Local API is offline. Showing the deterministic demo analysis. Start FastAPI to parse your file.') }
    finally { setBusy(false) }
  }
  return <>
    <PageIntro kicker="STEP 01 · RESUME LAB" title="See what a machine may actually understand.">Upload PDF or DOCX. Files are parsed by your localhost backend; ProofCoach does not send them to analytics.</PageIntro>
    <div className="resume-layout">
      <Panel title="Local resume input" subtitle="PDF or DOCX · maximum 8 MB">
        <input ref={input} type="file" accept=".pdf,.docx" hidden onChange={e => upload(e.target.files?.[0])} />
        <button className="dropzone" onClick={() => input.current?.click()} disabled={busy}><UploadCloud /><b>{busy ? 'Parsing locally…' : 'Choose a resume'}</b><span>or drop a PDF/DOCX into this area</span><small><LockKeyhole size={13} /> Local backend only</small></button>
        <div className="uploaded-file"><FileText /><span><b>{file}</b><small>{status}</small></span><StatusPill state="pass">READY</StatusPill></div>
        <div className="resume-preview"><span>WHAT THE PARSER RECOVERED</span><h4>Demo Candidate</h4><p>BE Artificial Intelligence & Machine Learning</p><div className="tag-row"><i>Python</i><i>FastAPI</i><i>REST</i><i>SQL</i><i>Git</i></div><h5>Flood Prediction API</h5><p>Built FastAPI backend · Reduced API latency by 35%</p></div>
      </Panel>
      <Panel title="ProofCoach Parser Robustness" subtitle="A transparent local diagnostic—not a universal ATS score." className="parser-panel">
        <div className="score-summary"><ScoreRing value={82} label="Parser robustness" /><div><StatusPill state="warn">2 WARNINGS</StatusPill><h4>Readable, with layout risk</h4><p>Core evidence is recoverable, but two visual choices may change reading order in different parsers.</p></div></div>
        <div className="parser-checks">{parserChecks.map(item => <div key={item.label}><span className={item.state}><ScanText /></span><div><b>{item.label}</b><small>{item.detail}</small></div><strong className={item.state}>{item.value}</strong></div>)}</div>
        <div className="warning-card"><AlertTriangle /><span><b>Fix before applying</b><p>Use a single-column skills/projects section and replace table cells with plain headings.</p></span></div>
      </Panel>
    </div>
    <div className="page-continue"><span>Next: compare this evidence with a real target role.</span><DemoPath to="/role" label="Analyze target role" /></div>
  </>
}

