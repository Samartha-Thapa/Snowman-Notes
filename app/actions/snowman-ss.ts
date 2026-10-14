"use server"

import { GoogleGenAI } from "@google/genai";


if (!process.env.GEMINI_API_KEY) {
    console.error("Critical error: GEMINI API KEY is not defined in .env.local");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function snowmanImage(base64Image: string, mimeType = "image/jpeg") {
    try{
        const response = await ai.models.generateContent({
            model: 'gemma-4-31b-it',
            contents: [
                {
                    inlineData: {
                        mimeType,
                        data: base64Image
                    }
                },
                "Analyze this classroom whiteboard or study material image. Output your response in two clear sections: 1. A detailed explanation of the concepts under the header '# EXPLANATION'. 2. A list of 4 flashcards under the header '# FLASHCARDS' using the format 'Q: [Question] | A: [Answer]'."
            ],
        });

        const rawText = response.text;
        if(!rawText) throw new Error("Empty response from Gemma 4");

        // splitting or trimming the response from ai for dashboard UI
        const [explanationPart, flashcardPart] = rawText.split('# FLASHCARDS');

        const explanation = explanationPart.replace('# EXPLANATION', '').trim();
        const flashcards = (flashcardPart || '').split('\n')
                                                .filter(line => line.includes('Q:') && line.includes('| A:'))
                                                .map(line => {
                                                    const [qPart, aPart] = line.split('|');
                                                    return {
                                                        front: qPart.replace('Q:', '').trim(),
                                                        back: aPart.replace('A:', '').trim()
                                                    };
                                                });
        return {
            success: true,
            data: { explanation, flashcards }
        }
    } catch (error) {
        console.error("Gemma 4 API Error:", error);
        return { success: false, error: "Failed to process image with Gemma 4"};
    }
}
