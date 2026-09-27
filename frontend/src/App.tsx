import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Shell } from './components/Shell'
import {
  DashboardPage, EvidencePage, FeedbackPage, FocusPage, InterviewPage, LandingPage,
  LearnPage, OnboardingPage, QuestPage, ResumePage, RolePage, SettingsPage, VideoPlanPage,
} from './pages'

export default function App() {
  const location = useLocation()
  const content = <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/onboarding" element={<OnboardingPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/resume" element={<ResumePage />} />
    <Route path="/role" element={<RolePage />} />
    <Route path="/evidence" element={<EvidencePage />} />
    <Route path="/interview" element={<InterviewPage />} />
    <Route path="/feedback" element={<FeedbackPage />} />
    <Route path="/learn" element={<LearnPage />} />
    <Route path="/video-plan" element={<VideoPlanPage />} />
    <Route path="/quest" element={<QuestPage />} />
    <Route path="/focus" element={<FocusPage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
  return location.pathname === '/' ? content : <Shell>{content}</Shell>
}

