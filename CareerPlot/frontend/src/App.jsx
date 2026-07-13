import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ResumeUpload from './pages/ResumeUpload';
import InterviewRoom from './pages/InterviewRoom';
import CareerRoadmap from './pages/CareerRoadmap';
import JobMatch from './pages/JobMatch';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<ResumeUpload />} />
          <Route path="/interview" element={<InterviewRoom />} />
          <Route path="/roadmap" element={<CareerRoadmap />} />
          <Route path="/match" element={<JobMatch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
