import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY =
  "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";

app.post("/api/ask", async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res
        .status(response.status)
        .json({ error: errorData.error || "Unknown error" });
    }

    const data = await response.json();
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unknown error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
