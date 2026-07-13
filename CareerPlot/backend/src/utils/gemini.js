import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

/**
 * Helper to call Gemini and parse JSON response.
 */
export const callGeminiJSON = async (prompt, systemInstruction = '') => {
  try {
    const fullPrompt = `${systemInstruction}\n\n${prompt}\n\nPlease respond ONLY with valid JSON. Do not include markdown code blocks like \`\`\`json.`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up potential markdown formatting
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error calling Gemini:', error);
    throw error;
  }
};

export const callGeminiText = async (prompt, systemInstruction = '') => {
  try {
    const fullPrompt = `${systemInstruction}\n\n${prompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini:', error);
    throw error;
  }
};
