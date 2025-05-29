import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
  baseURL: "https://openrouter.ai/api/v1", // explicitly set baseURL for OpenRouter
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-0528-qwen3-8b:free", // or a valid model on OpenRouter
    messages: [{ role: "user", content: "Hello from OpenRouter" }],
  });
  console.log(completion.choices[0].message);
}

main();
