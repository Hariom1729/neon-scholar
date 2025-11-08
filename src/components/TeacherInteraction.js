import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import './ui.css';

const GEMINI_MODEL = 'gemini-pro';

// Function to simulate video generation using Neo3
const generateVideo = async (text) => {
  console.log(`Generating video for text: "${text}"`);
  return new Promise(resolve => {
    setTimeout(() => {
      const videoUrl = "https://example.com/generated-video.mp4";
      console.log(`Video generated: ${videoUrl}`);
      resolve(videoUrl);
    }, 2000);
  });
};

// Function to generate text using Gemini API
const generateGeminiResponse = async (prompt, apiKey) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    // Add safety settings to reduce the chance of prompts being blocked
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_ONLY_HIGH",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_ONLY_HIGH",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_ONLY_HIGH",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH",
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorDetails = data.error ? `Details: ${data.error.message}` : 'No additional details available.';
      throw new Error(`HTTP error! status: ${response.status}. ${errorDetails}`);
    }

    if (data.promptFeedback && data.promptFeedback.blockReason) {
      return `Your prompt was blocked for the following reason: ${data.promptFeedback.blockReason}. Please adjust your prompt and try again.`
    }

    if (!data.candidates || data.candidates.length === 0) {
      return "The model did not return any content. This can happen for safety reasons or if the prompt is empty. Please try a different prompt.";
    }

    const text = data.candidates[0].content.parts[0].text;
    return text;

  } catch (error) {
    console.error("Error generating response from Gemini:", error);
    return `An error occurred while communicating with the API: ${error.message}`;
  }
};


export default function TeacherInteraction() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const debouncedSubmit = useCallback(
    debounce(async (currentPrompt) => {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

      if (!apiKey) {
        setResponse("API key not found. Please ensure you have set up your .env file with REACT_APP_GEMINI_API_KEY.");
        setIsLoading(false);
        return;
      }

      try {
        const geminiResponse = await generateGeminiResponse(currentPrompt, apiKey);
        setResponse(geminiResponse);

        // Only generate a video if the response was successful
        if (!geminiResponse.startsWith("An error occurred") && !geminiResponse.startsWith("Your prompt was blocked")) {
          const generatedVideoUrl = await generateVideo(geminiResponse);
          setVideoUrl(generatedVideoUrl);
        }

      } catch (error) {
        console.error('Error in submission handler:', error);
        setResponse(`An unexpected error occurred: ${error.message}`)
      } finally {
        setIsLoading(false);
      }
    }, 1000), // Debounce for 1 second to prevent rate-limiting
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');
    setVideoUrl('');
    debouncedSubmit(prompt);
  };

  return (
    <div className="dashboard">
      <div className="header-row">
        <div className="app-title">AI Teacher Interaction</div>
        <button className="btn ghost" onClick={() => navigate('/')}>
          Back to Dashboard
        </button>
      </div>

      <div className="left-panel">
        <div className="neon-card glow">
          <h3>Chat with AI Teacher</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask your AI teacher anything... (e.g., 'Can you explain quantum physics in simple terms?')"
              rows={4}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '12px',
                color: '#fff',
                marginBottom: '12px'
              }}
            />
            <button
              className="btn primary"
              type="submit"
              disabled={isLoading}
              style={{ width: '100%' }}
            >
              {isLoading ? 'Processing...' : 'Get Response & Generate Video'}
            </button>
          </form>
        </div>

        {response && (
          <div className="neon-card">
            <h3>AI Response</h3>
            <div className="response-content" style={{ whiteSpace: 'pre-wrap' }}>
              {response}
            </div>
          </div>
        )}

        {videoUrl && (
          <div className="neon-card">
            <h3>Generated Video Explanation</h3>
            <div className="video-container" style={{ marginTop: '12px' }}>
              <video
                controls
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.2)'
                }}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>

      <aside className="right-panel">
        <div className="neon-card">
          <h4>Tips for Better Responses</h4>
          <ul className="small-muted" style={{ paddingLeft: '20px' }}>
            <li>Be specific with your questions</li>
            <li>Mention your current knowledge level</li>
            <li>Ask for examples when needed</li>
            <li>Request simpler explanations if needed</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
