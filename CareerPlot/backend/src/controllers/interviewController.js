import Interview from '../models/Interview.js';
import { interviewCoachAgent } from '../agents/interviewCoach.js';

export const startInterview = async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ message: 'Role is required' });
    }

    const result = await interviewCoachAgent.run({ action: 'generate', role });
    
    // Create new interview session
    const interview = await Interview.create({
      user: req.user._id,
      role,
      history: [
        {
          question: result.question,
          userAnswer: '',
          evaluation: null,
        }
      ]
    });

    res.status(200).json({ interview, nextQuestion: result.question });
  } catch (error) {
    res.status(500).json({ message: 'Error starting interview', error: error.message });
  }
};

export const answerQuestion = async (req, res) => {
  try {
    const { interviewId, answer } = req.body;
    
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Get the last question
    const lastHistoryIdx = interview.history.length - 1;
    const currentQuestion = interview.history[lastHistoryIdx].question;

    // Evaluate
    const evaluation = await interviewCoachAgent.run({
      action: 'evaluate',
      question: currentQuestion,
      answer
    });

    interview.history[lastHistoryIdx].userAnswer = answer;
    interview.history[lastHistoryIdx].evaluation = evaluation;

    // Generate next question
    const result = await interviewCoachAgent.run({ action: 'generate', role: interview.role });
    
    interview.history.push({
      question: result.question,
      userAnswer: '',
      evaluation: null
    });

    // Update overall confidence score (simple average)
    let totalScore = 0;
    let evaluatedCount = 0;
    interview.history.forEach(h => {
      if (h.evaluation && h.evaluation.score) {
        totalScore += h.evaluation.score;
        evaluatedCount++;
      }
    });
    if (evaluatedCount > 0) {
      interview.overallConfidenceScore = totalScore / evaluatedCount;
    }

    await interview.save();

    res.status(200).json({
      evaluation,
      nextQuestion: result.question,
      overallConfidenceScore: interview.overallConfidenceScore
    });
  } catch (error) {
    res.status(500).json({ message: 'Error answering question', error: error.message });
  }
};
