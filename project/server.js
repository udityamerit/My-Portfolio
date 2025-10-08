// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- Initialization ---
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

// --- 💡 DEBUGGING: Check if the API key is loaded ---
const apiKey = process.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("🔴 FATAL ERROR: VITE_GEMINI_API_KEY is not defined in the .env file.");
  console.error("Please ensure you have a .env file in the project root with your API key.");
  process.exit(1); // Stop the server if the key is missing
}
console.log("✅ API Key loaded successfully.");

// --- Initialize Google AI ---
const genAI = new GoogleGenerativeAI(apiKey);

// --- The Main API Endpoint ---
app.post('/api/chat', async (req, res) => {
  console.log("➡️ Received request for /api/chat");
  try {
    const { history, userMessage, prompt } = req.body;
    if (!userMessage) {
      return res.status(400).json({ error: 'userMessage is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({ history: history || [] });
    const fullPrompt = `${prompt}\n\nUser Question: ${userMessage}`;
    const result = await chat.sendMessage(fullPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("⬅️ Sending response from Gemini");
    res.json({ response: text });

  } catch (error) {
    console.error("🔴 ERROR in /api/chat endpoint:", error);
    res.status(500).json({ error: 'An error occurred while communicating with the Gemini API.' });
  }
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`✅ Secure backend server is running on http://localhost:${port}`);
});