
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { LearningMode, Topic, ChatMessage } from '../types';

interface AiResponse {
  english: string;
  chinese: string;
  suggestions: string[];
}

export const generateAiResponse = async (
  history: ChatMessage[],
  mode: LearningMode,
  topic: Topic
): Promise<AiResponse> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return {
      english: "I'm having trouble connecting. Please check the setup.",
      chinese: "我無法連接。請檢查設定。",
      suggestions: ["Help", "What's wrong?", "Let's try again."],
    };
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `You are QMEI, an encouraging and friendly English teacher for kids. Your tone is always positive and cheerful.
  You MUST respond in a valid JSON format.
  Rules:
  - Keep your English responses under 50 words to be easy for a child to understand.
  - Your entire response must strictly follow this JSON schema: {"english": "your response in English", "chinese": "your response translated to Chinese", "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]}.
  - Provide exactly 3 new, relevant, and simple suggestions for the user's next reply.
  - Adapt your language complexity for a child learning English.
  - The current learning mode is '${mode}' and the topic is '${topic.name}'. Stay on topic.
  - Do not use markdown characters like '*' or '#' inside the JSON fields.`;

  const modelHistory = history.map(msg => ({
    role: msg.sender === 'ai' ? 'model' : 'user',
    parts: [{ text: msg.text }]
  }));

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: modelHistory,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData: AiResponse = JSON.parse(jsonStr);

    if (
      !parsedData.english ||
      !parsedData.chinese ||
      !Array.isArray(parsedData.suggestions) ||
      parsedData.suggestions.length !== 3
    ) {
      throw new Error("Invalid JSON structure from AI.");
    }
    
    return parsedData;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    return {
      english: "Oops! I seem to be having a little trouble thinking. Could you please say that again?",
      chinese: "哎呀！我好像有點思考困難。可以請你再說一次嗎？",
      suggestions: ["Let's try again.", "What are we talking about?", "Tell me a fun fact!"],
    };
  }
};
