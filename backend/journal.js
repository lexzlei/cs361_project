import express from 'express';
import fetch from 'node-fetch';
import { GoogleGenAI } from '@google/genai';
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const gemini = new GoogleGenAI({});

router.post('/reflection', async (req, res) => {
    const { entry, tone } = req.body;
    const promptMap = {
        compassionate: "Offer a kind, empathetic reflection",
        motivational: "Offer a short motivational reflection",
        philosophical: "Reflect in a deep, philosophical tone",
        humorous: "Make a witty, humorous, lighthearted reflection"
    };

    const promptStyle = promptMap[tone] || promptMap['compassionate'];
    console.log(`Generating reflection with tone: ${tone}`);
    if (!entry) {
        return res.status(400).json({ error: 'Entry is required.' });   
    }

    try {
        const response = await gemini.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${promptStyle} on the following journal entry with no more than 500 words: "${entry}"`,
            config: {
                systemInstruction: "You are a therapist. Your job is to utilize therapy techniques to reflect on a user's journal entry.",
            },
        });
        const reflection = response.text;
        res.json({ reflection });
    } catch (error) {
        console.error('Error generating reflection:', error);
        res.status(500).json({ error: 'Failed to generate reflection.' });
    }
});

export default router;