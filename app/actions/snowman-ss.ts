import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const interaction = await ai.interactions.create({
    model: "gemma-4-31b-it",
    input: "Explain how AI works in a few words",
});

console.log(interaction.output_text);