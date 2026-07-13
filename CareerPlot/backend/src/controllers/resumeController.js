import fs from 'fs';
import Resume from '../models/Resume.js';
import JobMatch from '../models/JobMatch.js';
import Roadmap from '../models/Roadmap.js';
import { extractTextFromPDF } from '../utils/pdfParser.js';
import { Workflow } from '../lemma/workflowEngine.js';
import { resumeAnalyzerAgent } from '../agents/resumeAnalyzer.js';
import { jobMatcherAgent } from '../agents/jobMatcher.js';
import { careerRoadmapperAgent } from '../agents/careerRoadmapper.js';

export const uploadAndAnalyze = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { jobRole } = req.body;
    if (!jobRole) {
      return res.status(400).json({ message: 'Preferred job role is required' });
    }

    // 1. Extract Text
    const text = await extractTextFromPDF(req.file.path);

    // 2. Build Lemma SDK Workflow
    const placementWorkflow = new Workflow('Placement AI Workflow')
      .addStep(resumeAnalyzerAgent, (input) => input) // receives text directly
      .addStep(jobMatcherAgent, (output, context) => ({
        skills: output.skills,
        jobRole: jobRole
      }))
      .addStep(careerRoadmapperAgent, (output, context) => ({
        skills: context.ResumeAnalyzer.skills,
        weakSections: context.ResumeAnalyzer.weakSections,
        jobRole: jobRole
      }));

    // 3. Execute Workflow
    const workflowResults = await placementWorkflow.execute(text);
    
    // Clean up temp file
    fs.unlinkSync(req.file.path);

    const { ResumeAnalyzer: resumeAnalysis, JobMatcher: jobMatchResult, CareerRoadmapper: roadmapResult } = workflowResults;

    // 4. Save to DB
    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      extractedText: text,
      analysis: resumeAnalysis,
    });

    const jobMatch = await JobMatch.create({
      user: req.user._id,
      resume: resume._id,
      jobRole,
      ...jobMatchResult
    });

    const roadmap = await Roadmap.create({
      user: req.user._id,
      jobRole,
      durationDays: roadmapResult.durationDays,
      weeks: roadmapResult.weeks
    });

    res.status(200).json({
      message: 'Analysis complete',
      resume,
      jobMatch,
      roadmap
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.error(error);
    res.status(500).json({ message: 'Error analyzing resume', error: error.message });
  }
};
