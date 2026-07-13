import { Agent } from '../lemma/workflowEngine.js';
import { callGeminiJSON } from '../utils/gemini.js';

const systemInstruction = `You are an expert Resume Analyzer Agent.
Your task is to analyze a given resume text and extract key information.
You must return a JSON object with the following exact keys:
- "skills" (array of strings)
- "atsScore" (number between 0 and 100)
- "weakSections" (array of strings)
- "suggestions" (array of strings)
- "missingTechnologies" (array of strings)
- "recommendedProjects" (array of strings)
- "improvedSummary" (string)
Do NOT include any extra text.`;

const executor = async (input, instruction, context) => {
  const prompt = `Please analyze the following resume text:\n\n${input}`;
  const result = await callGeminiJSON(prompt, instruction);
  return result;
};

export const resumeAnalyzerAgent = new Agent(
  'ResumeAnalyzer',
  systemInstruction,
  executor
);
