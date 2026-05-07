import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from 'process';

async function list() {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY not found');
    return;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const models = await genAI.listModels();
  console.log(JSON.stringify(models, null, 2));
}
list();
