
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getShoppingAdvice = async (userQuery: string, chatHistory: {role: string, content: string}[]) => {
  const model = "gemini-3-flash-preview";
  
  const productContext = PRODUCTS.map(p => 
    `- ${p.name}: ${p.description} (Price: $${p.price}, Category: ${p.category})`
  ).join('\n');

  const systemInstruction = `
    You are LuxeMart AI, a sophisticated personal shopping assistant.
    Your goal is to help users find the perfect product from our catalog.
    
    Current Catalog:
    ${productContext}
    
    Guidelines:
    1. Be helpful, professional, and friendly.
    2. If a user asks for recommendations, suggest specific items from our catalog.
    3. If they ask for something not in the catalog, politely explain we don't carry it but suggest the closest alternative if possible.
    4. Keep responses concise and formatted with markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...chatHistory.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: userQuery }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "I'm sorry, I'm having trouble connecting to my shopping brain right now. Please try again in a moment!";
  }
};
