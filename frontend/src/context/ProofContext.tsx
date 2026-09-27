import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { initialDemoState } from '../data/demo'
import type { Candidate, DemoState, MetricKey } from '../types'

interface ProofContextValue {
  state: DemoState
  updateCandidate: (candidate: Partial<Candidate>) => void
  complete: (key: string) => void
  setMetric: (key: MetricKey, value: number) => void
  setAnswer: (answer: string) => void
  submitInterview: () => void
  setEvidenceLockDemo: (value: DemoState['evidenceLockDemo']) => void
  resetDemo: () => void
  deleteLocalData: () => void
}

const STORAGE_KEY = 'proofcoach-demo-v1'
const ProofContext = createContext<ProofContextValue | null>(null)

function loadState(): DemoState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...initialDemoState, ...JSON.parse(stored) } : initialDemoState
  } catch { return initialDemoState }
}

export function ProofProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(loadState)
  const commit = (next: DemoState) => { setState(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) }
  const value = useMemo<ProofContextValue>(() => ({
    state,
    updateCandidate: candidate => commit({ ...state, candidate: { ...state.candidate, ...candidate } }),
    complete: key => commit({ ...state, completed: Array.from(new Set([...state.completed, key])) }),
    setMetric: (key, value) => commit({ ...state, metrics: { ...state.metrics, [key]: value } }),
    setAnswer: answer => commit({ ...state, answer }),
    submitInterview: () => commit({ ...state, interviewAnswered: true, currentQuestion: 1, metrics: { ...state.metrics, interview: 76, claim: 82, questPoints: state.metrics.questPoints + 50 }, completed: Array.from(new Set([...state.completed, 'interview', 'feedback'])) }),
    setEvidenceLockDemo: evidenceLockDemo => commit({ ...state, evidenceLockDemo }),
    resetDemo: () => commit({ ...initialDemoState }),
    deleteLocalData: () => { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem('proofcoach-focus-v1'); setState({ ...initialDemoState, candidate: { ...initialDemoState.candidate, name: '' }, completed: [] }) },
  }), [state])
  return <ProofContext.Provider value={value}>{children}</ProofContext.Provider>
}

// Shared hook intentionally lives beside its provider.
// eslint-disable-next-line react-refresh/only-export-components
export function useProof() {
  const context = useContext(ProofContext)
  if (!context) throw new Error('useProof must be used inside ProofProvider')
  return context
}
