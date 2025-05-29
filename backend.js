// server.js (Node.js + Express)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey:
    "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", // Put your OpenRouter key in env variable
});

app.post("/api/ask", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free", // your free model
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unknown error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
