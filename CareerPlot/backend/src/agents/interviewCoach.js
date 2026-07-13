import { Agent } from '../lemma/workflowEngine.js';
import { callGeminiJSON } from '../utils/gemini.js';

const systemInstruction = `You are an expert Interview Coach Agent.
The user is preparing for a specific job role.
Based on the current context (either asking a new question or evaluating an answer), you must return a JSON object.
If generating a question, return:
{ "question": "The interview question" }

If evaluating an answer, return:
{
  "score": number (0-100),
  "mistakes": ["list", "of", "mistakes"],
  "idealAnswer": "The ideal answer to the question"
}
Do NOT include any extra text.`;

const executor = async (input, instruction, context) => {
  let prompt = '';
  if (input.action === 'generate') {
    prompt = `Role: ${input.role}\nGenerate a realistic, challenging interview question for this role.`;
  } else if (input.action === 'evaluate') {
    prompt = `Question: ${input.question}\nUser Answer: ${input.answer}\nEvaluate the answer.`;
  }
  
  const result = await callGeminiJSON(prompt, instruction);
  return result;
};

export const interviewCoachAgent = new Agent(
  'InterviewCoach',
  systemInstruction,
  executor
);
