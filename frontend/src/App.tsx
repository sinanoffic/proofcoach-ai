import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Shell } from './components/Shell'

const LandingPage = lazy(() => import('./pages/LandingPage').then(module => ({ default: module.LandingPage })))
const OnboardingPage = lazy(() => import('./pages/OnboardingPage').then(module => ({ default: module.OnboardingPage })))
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })))
const ResumePage = lazy(() => import('./pages/ResumePage').then(module => ({ default: module.ResumePage })))
const RolePage = lazy(() => import('./pages/RolePage').then(module => ({ default: module.RolePage })))
const EvidencePage = lazy(() => import('./pages/EvidencePage').then(module => ({ default: module.EvidencePage })))
const InterviewPage = lazy(() => import('./pages/InterviewPage').then(module => ({ default: module.InterviewPage })))
const FeedbackPage = lazy(() => import('./pages/FeedbackPage').then(module => ({ default: module.FeedbackPage })))
const LearnPage = lazy(() => import('./pages/LearnPage').then(module => ({ default: module.LearnPage })))
const VideoPlanPage = lazy(() => import('./pages/VideoPlanPage').then(module => ({ default: module.VideoPlanPage })))
const ProjectLabPage = lazy(() => import('./pages/ProjectLabPage').then(module => ({ default: module.ProjectLabPage })))
const QuestPage = lazy(() => import('./pages/QuestPage').then(module => ({ default: module.QuestPage })))
const FocusPage = lazy(() => import('./pages/FocusPage').then(module => ({ default: module.FocusPage })))
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(module => ({ default: module.SettingsPage })))

export default function App() {
  const location = useLocation()
  const content = <Suspense fallback={<div className="route-loading"><span />Preparing evidence workspace…</div>}><Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/onboarding" element={<OnboardingPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/dashboard" element={<Navigate to="/profile" replace />} />
    <Route path="/resume" element={<ResumePage />} />
    <Route path="/role" element={<RolePage />} />
    <Route path="/evidence" element={<EvidencePage />} />
    <Route path="/interview" element={<InterviewPage />} />
    <Route path="/feedback" element={<FeedbackPage />} />
    <Route path="/learn" element={<LearnPage />} />
    <Route path="/video-plan" element={<VideoPlanPage />} />
    <Route path="/project-lab" element={<ProjectLabPage />} />
    <Route path="/quest" element={<QuestPage />} />
    <Route path="/focus" element={<FocusPage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></Suspense>
  return location.pathname === '/' ? content : <Shell>{content}</Shell>
}
