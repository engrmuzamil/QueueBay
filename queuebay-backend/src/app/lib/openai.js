// lib/openai.js

export async function analyzeImageWithGPT4Vision(imageUrl, prompt) {
  const systemPrompt = `You are an image analyst for user profiles. Respond in this JSON: { "description": string }`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4-vision-preview",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [{ type: "image_url", image_url: { url: imageUrl } }],
        },
      ],
      max_tokens: 100,
    }),
  });

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content || "{}";
  return JSON.parse(content);
}

export async function summarizeDashboardWithGPT(data) {
  const prompt = `
You're a smart AI assistant helping summarize a user's activity on a marketplace. 
Input:
- Listings: ${JSON.stringify(data.listings.slice(0, 3))}
- Negotiations: ${JSON.stringify(data.negotiations.slice(0, 3))}
- Orders: ${JSON.stringify(data.orders.slice(0, 3))}

Respond in this format:
{
 "summary": "You have 3 active listings, 2 pending negotiations, and 1 confirmed COD order."
}
 `.trim();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Respond in JSON only. Don’t hallucinate extra fields.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    }),
  });

  const json = await res.json();
  const content = json.choices?.[0]?.message?.content || "{}";
  return JSON.parse(content);
}

export async function runGPT4Text(prompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.3,
    }),
  });

  const json = await res.json();
  return json?.choices?.[0]?.message?.content || "";
}
