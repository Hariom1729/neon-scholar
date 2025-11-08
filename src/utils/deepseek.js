import { OpenRouter } from '@openrouter/sdk';

// IMPORTANT: Replace "YOUR_API_KEY" with your actual OpenRouter API key.
// You can get a key from https://openrouter.ai/keys
const openRouter = new OpenRouter({
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": window.location.href,
    "X-Title": "Neon Scholar",
  },
});

/**
 * Gets a completion from the OpenRouter API.
 * @param {Array<{role: string, content: string}>} messages - The messages to send to the AI.
 * @returns {Promise<string>} The AI's response.
 */
export const generateDeepSeekResponse = async (messages) => {
  try {
    const completion = await openRouter.chat.send({
      model: 'openai/gpt-4o',
      messages: messages,
      stream: false,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error getting completion from OpenRouter:", error);
    return "Sorry, I'm having trouble connecting to the AI. Please try again later.";
  }
};
