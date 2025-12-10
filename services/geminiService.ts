import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBiblicalFact = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a fascinating, short fact (maximum 2 sentences) in Hebrew about "${topic}" specifically related to the biblical story of King David. It should be suitable for children.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster response on simple facts
      }
    });

    return response.text || "לא הצלחנו למצוא עובדה כרגע, נסה שוב!";
  } catch (error) {
    console.error("Error fetching fact:", error);
    return "דוד המלך היה דמות מרתקת בהיסטוריה!";
  }
};
