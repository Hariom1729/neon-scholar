// Lightweight Gemini helper for generating text content.
// Uses REACT_APP_GEMINI_API_KEY from env. Returns the model's text output.
export async function generateGeminiResponse(prompt, model = 'gemini-pro') {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('REACT_APP_GEMINI_API_KEY is not set in the environment.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.8, // Increased for more varied responses
      maxOutputTokens: 512,
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();

  if (!res.ok) {
    const errMsg = data.error?.message || 'Unknown API error';
    throw new Error(`Gemini API error: ${errMsg}`);
  }

  // Safely access the text from the response
  try {
    return data.candidates[0].content.parts[0].text;
  } catch (e) {
    console.error("Error parsing Gemini response:", data);
    throw new Error("Could not extract text from the Gemini API response.");
  }
}
