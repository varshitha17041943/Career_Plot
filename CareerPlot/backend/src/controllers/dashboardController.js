import Resume from '../models/Resume.js';
import Interview from '../models/Interview.js';
import JobMatch from '../models/JobMatch.js';
import Roadmap from '../models/Roadmap.js';

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get latest data
    const resume = await Resume.findOne({ user: userId }).sort({ createdAt: -1 });
    const interviews = await Interview.find({ user: userId }).sort({ createdAt: -1 });
    const latestJobMatch = await JobMatch.findOne({ user: userId }).sort({ createdAt: -1 });
    const latestRoadmap = await Roadmap.findOne({ user: userId }).sort({ createdAt: -1 });

    // Calculate Placement Readiness Score
    let readinessScore = 0;
    const atsScore = resume?.analysis?.atsScore || 0;
    
    // Average interview score
    let interviewScore = 0;
    if (interviews.length > 0) {
      const scoredInterviews = interviews.filter(i => i.overallConfidenceScore > 0);
      if (scoredInterviews.length > 0) {
        interviewScore = scoredInterviews.reduce((acc, curr) => acc + curr.overallConfidenceScore, 0) / scoredInterviews.length;
      }
    }

    const jobMatchPercent = latestJobMatch?.matchPercentage || 0;

    if (resume && interviews.length > 0 && latestJobMatch) {
      readinessScore = Math.round((atsScore * 0.3) + (interviewScore * 0.4) + (jobMatchPercent * 0.3));
    } else {
      readinessScore = Math.round((atsScore * 0.5) + (jobMatchPercent * 0.5));
    }

    res.status(200).json({
      readinessScore,
      atsScore,
      interviewScore: Math.round(interviewScore),
      jobMatchPercent,
      resumeAnalysis: resume?.analysis || null,
      latestJobMatch: latestJobMatch || null,
      roadmap: latestRoadmap || null,
      recentInterviews: interviews.slice(0, 3)
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
};
