import { AlertTriangle, FileText, LockKeyhole, ScanText, UploadCloud } from 'lucide-react'
import { useRef, useState } from 'react'
import { DemoPath } from '../components/Shell'
import { PageIntro, Panel, ScoreRing, StatusPill } from '../components/UI'
import { parserChecks } from '../data/demo'
import { parseResume } from '../services/api'

export function ResumePage() {
  type Analysis = { parser_robustness: number, text_preview: string, skills: string[], measurable_claims: string[], checks: { label: string, status: string, detail: string, points: number, maximum: number }[] }
  const input = useRef<HTMLInputElement>(null); const [file, setFile] = useState('proofcoach-demo-resume.pdf'); const [status, setStatus] = useState('Demo resume analyzed locally.'); const [busy, setBusy] = useState(false); const [analysis, setAnalysis] = useState<Analysis | null>(null); const [dragging, setDragging] = useState(false)
  const upload = async (selected?: File) => {
    if (!selected) return
    if (!/\.(pdf|docx)$/i.test(selected.name) || selected.size > 8 * 1024 * 1024) { setStatus('Choose a PDF or DOCX under 8 MB.'); return }
    setFile(selected.name); setBusy(true); setStatus('Parsing through the local backend…')
    try { const result = await parseResume(selected) as Analysis; setAnalysis(result); setStatus(`Local parse complete: ${result.parser_robustness} / 100`) }
    catch { setAnalysis(null); setStatus('Local API is offline. Demo analysis is shown below; your selected file was not analyzed.') }
    finally { setBusy(false) }
  }
  const checks = analysis ? analysis.checks.map(item => ({ label: item.label, detail: item.detail, state: item.status === 'pass' ? 'pass' : 'warn', value: `${item.points}/${item.maximum}` })) : parserChecks
  const warnings = checks.filter(item => item.state !== 'pass').length
  return <>
    <PageIntro kicker="STEP 01 · RESUME LAB" title="See what a machine may actually understand.">Upload PDF or DOCX. Files are parsed by your localhost backend; ProofCoach does not send them to analytics.</PageIntro>
    <div className="resume-layout">
      <Panel title="Local resume input" subtitle="PDF or DOCX · maximum 8 MB">
        <input ref={input} type="file" accept=".pdf,.docx" hidden onChange={e => upload(e.target.files?.[0])} />
        {!analysis && <button className={dragging ? 'dropzone dragging' : 'dropzone'} onClick={() => input.current?.click()} onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); void upload(e.dataTransfer.files[0]) }} disabled={busy}><UploadCloud /><b>{busy ? 'Parsing locally…' : 'Choose or drop a resume'}</b><span>PDF or DOCX · under 8 MB</span><small><LockKeyhole size={13} /> Local backend only</small></button>}
        <div className="uploaded-file"><FileText /><span><b>{file}</b><small>{status}</small></span><StatusPill state={analysis ? 'pass' : 'info'}>{analysis ? 'PARSED' : 'DEMO'}</StatusPill></div>
        {analysis && <button className="btn outline wide" onClick={() => input.current?.click()}>Replace resume</button>}
        <div className="resume-preview"><span>WHAT THE MACHINE RECOVERED · {analysis ? 'YOUR FILE' : 'DEMO SAMPLE'}</span>{analysis ? <><div className="tag-row">{analysis.skills.map(skill => <i key={skill}>{skill}</i>)}</div><p className="preview-text">{analysis.text_preview}</p><h5>Measurable claims</h5>{analysis.measurable_claims.length ? analysis.measurable_claims.map(claim => <p key={claim}>{claim}</p>) : <p>No measurable claims detected.</p>}</> : <><h4>Demo Candidate</h4><p>BE Artificial Intelligence & Machine Learning</p><div className="tag-row"><i>Python</i><i>FastAPI</i><i>REST</i><i>SQL</i><i>Git</i></div><h5>Flood Prediction API</h5><p>Built FastAPI backend · Reduced API latency by 35%</p></>}</div>
      </Panel>
      <Panel title="ProofCoach Parser Robustness" subtitle="A transparent local diagnostic—not a universal ATS score." className="parser-panel">
        <div className="score-summary"><ScoreRing value={analysis?.parser_robustness ?? 82} label="Parser robustness" /><div><StatusPill state={warnings ? 'warn' : 'pass'}>{warnings} {warnings === 1 ? 'WARNING' : 'WARNINGS'}</StatusPill><h4>{warnings ? 'Readable, with layout risk' : 'Core content recovered'}</h4><p>{analysis ? 'Review the checks below and correct any sections the parser could not reliably recover.' : 'The demo has two layout warnings and a skills context warning. Each check is listed below.'}</p></div></div>
        <div className="parser-checks">{checks.map(item => <div key={item.label}><span className={item.state}><ScanText /></span><div><b>{item.label}</b><small>{item.detail}</small></div><strong className={item.state}>{item.value}</strong></div>)}</div>
        {warnings > 0 && <div className="warning-card"><AlertTriangle /><span><b>Fix before applying</b><p>{analysis ? 'Review the warned fields and simplify complex columns or tables if detected.' : 'Use a single-column skills/projects section and replace table cells with plain headings.'}</p></span></div>}
      </Panel>
    </div>
    <div className="page-continue"><span>Next: compare this evidence with a real target role.</span><DemoPath to="/role" label="Analyze target role" /></div>
  </>
}
