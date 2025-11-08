// Lightweight DeepSeek helper for generating text content.
// Uses REACT_APP_DEEPSEEK_API_KEY from env. Returns the model's text output.
export async function generateDeepSeekResponse(prompt, model = 'deepseek-chat') {
  const apiKey = process.env.REACT_APP_DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('REACT_APP_DEEPSEEK_API_KEY is not set in the environment.');
  }

  const url = 'https://api.deepseek.com/chat/completions';

  const requestBody = {
    model: model,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 512,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await res.json();

  if (!res.ok) {
    const errMsg = data.error?.message || 'Unknown API error';
    throw new Error(`DeepSeek API error: ${errMsg}`);
  }

  if (!data.choices || data.choices.length === 0) return '';
  const text = data.choices[0].message?.content || '';
  return text;
}
