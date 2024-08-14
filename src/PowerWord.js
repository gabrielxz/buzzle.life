import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PowerWord() {  // Rename the component from App to PowerWord
  const [powerWord, setPowerWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [shareText, setShareText] = useState('');

  const generatePowerWord = async () => {
    try {
      const userAgent = navigator.userAgent;
      const ipAddress = await fetch('https://api.ipify.org?format=json')
        .then((response) => response.json())
        .then((data) => data.ip);

      const lambdaUrl = `https://vwv3xdkxisbym6lpohvmhxzjaq0dktte.lambda-url.us-east-1.on.aws/?userAgent=${encodeURIComponent(userAgent)}&ipAddress=${encodeURIComponent(ipAddress)}`;

      const response = await fetch(lambdaUrl);
      const data = await response.json();
      const formattedWord = `✨ ${data.power_word.toUpperCase()} ✨`;
      setPowerWord(data.power_word);

      const wordDefinition = await fetchChatGPTDefinition(data.power_word);
      setDefinition(wordDefinition);

      setShareText(
        `🎉 Your Power Word for Today 🎉\n\n` +
        `${formattedWord}\n\n` +
        `Definition: ${wordDefinition}\n\n` +
        `🌟 Unleash your potential with this!🌟\n\n` +
        `🔗 Visit us at: https://buzzle.life 🌐`
      );
    } catch (error) {
      console.error('Error fetching power word:', error);
    }
  };

  const fetchChatGPTDefinition = async (word) => {
    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // OpenAI API Key

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini', // or 'gpt-4' if you have access
          messages: [{ role: 'user', content: `Provide a short definition for the word "${word}".` }],
          max_tokens: 50, // Adjust the token limit as needed
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const definition = response.data.choices[0].message.content.trim();
      return definition || 'Definition not available.';
    } catch (error) {
      console.error('Error fetching definition from ChatGPT:', error);
      return 'Definition not available.';
    }
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Copied to clipboard!');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Daily Buzzle</h1>
      <button onClick={generatePowerWord} style={{ fontSize: '20px', padding: '10px 20px' }}>
        Generate Today's Power Word
      </button>
      {powerWord && (
        <div style={{ marginTop: '20px' }}>
          <h2>Your Power Word: {powerWord}</h2>
          <p>Definition: {definition}</p>
          <button
            onClick={() => copyToClipboard(shareText)}
            style={{ fontSize: '16px', padding: '8px 16px', marginTop: '10px' }}
          >
            Share Your Power Word
          </button>
          <Link to="/">
            <button style={{ fontSize: '16px', padding: '8px 16px' }}>
              Back to Main Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default PowerWord;
