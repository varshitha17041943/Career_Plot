import { Agent } from '../lemma/workflowEngine.js';
import { callGeminiJSON } from '../utils/gemini.js';

const systemInstruction = `You are an expert Job Match Agent.
Your task is to compare a candidate's skills against a preferred job role.
You must return a JSON object with the following exact keys:
- "matchPercentage" (number between 0 and 100)
- "missingSkills" (array of strings)
- "recommendedCertifications" (array of strings)
- "recommendedProjects" (array of strings)
- "suggestedTechnologies" (array of strings)
- "hiringProbability" (string: "Low", "Medium", or "High")
Do NOT include any extra text.`;

const executor = async (input, instruction, context) => {
  const prompt = `Candidate Skills: ${input.skills.join(', ')}\nPreferred Job Role: ${input.jobRole}`;
  const result = await callGeminiJSON(prompt, instruction);
  return result;
};

export const jobMatcherAgent = new Agent(
  'JobMatcher',
  systemInstruction,
  executor
);
