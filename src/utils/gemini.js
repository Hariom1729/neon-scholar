// Lightweight Gemini v1beta helper for generating text content.
// Uses REACT_APP_GEMINI_API_KEY from env. Returns the model's text output.
export async function generateGeminiResponse(prompt, model = 'gemini-pro') {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('REACT_APP_GEMINI_API_KEY is not set in the environment.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    // Ask the Gemini model to return a concise textual response.
    // Using the 'contents' shape similar to examples.
    contents: [{ parts: [{ text: prompt }] }],
    temperature: 0.2,
    maxOutputTokens: 512,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();

  if (!res.ok) {
    const errMsg = data.error?.message || 'Unknown API error';
    throw new Error(`Gemini API error: ${errMsg}`);
  }

  if (!data.candidates || data.candidates.length === 0) return '';
  const text = data.candidates[0].content?.parts?.[0]?.text || '';
  return text;
}
