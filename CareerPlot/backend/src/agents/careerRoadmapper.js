import { Agent } from '../lemma/workflowEngine.js';
import { callGeminiJSON } from '../utils/gemini.js';

const systemInstruction = `You are an expert Career Roadmap Agent.
Based on the candidate's skills, weak sections, and desired job role, generate a 4-week learning roadmap (30 Day Plan).
You must return a JSON object representing the weeks array with the exact following schema:
{
  "durationDays": 30,
  "weeks": [
    {
      "weekNumber": 1,
      "focusArea": "String",
      "tasks": [
        {
          "taskName": "String",
          "category": "String (must be one of: 'DSA', 'Projects', 'Development', 'Interview', 'Soft Skills', 'Aptitude', 'System Design')"
        }
      ]
    }
    // exactly 4 weeks
  ]
}
Do NOT include any extra text.`;

const executor = async (input, instruction, context) => {
  const prompt = `Candidate Skills: ${input.skills.join(', ')}\nWeak Sections: ${input.weakSections?.join(', ')}\nDesired Role: ${input.jobRole}`;
  const result = await callGeminiJSON(prompt, instruction);
  return result;
};

export const careerRoadmapperAgent = new Agent(
  'CareerRoadmapper',
  systemInstruction,
  executor
);
