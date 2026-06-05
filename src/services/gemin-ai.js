const { GoogleGenAI } = require("@google/genai");
const AppError = require("../utils/app-error");
require("dotenv").config();
const genAI = new GoogleGenAI({ apiKey: process.env.GEN_AI_API_KEY });

async function generateResponse(wishes) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are generating a heartfelt birthday thank-you reply.

Based on the birthday message below, create a warm, natural, and personalized response that emotionally matches the tone of the message.

Guidelines:
- Sound human and sincere
- Tailor the response to the exact wish
- Be appreciative and welcoming
- Use suitable emojis naturally to express emotion
- Avoid generic or repetitive wording
- Keep it to one sentence
- Do not use quotation marks
- Make the response feel personal and emotionally engaging

Birthday wish:
"${wishes}"
`,
    });
    return response.text;
  } catch (error) {
    throw new AppError("Error generating response", 500);
  }
}

module.exports = { generateResponse };
