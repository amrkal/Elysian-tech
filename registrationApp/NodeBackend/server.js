const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5001;
require('dotenv').config();

app.use(express.json());

app.get('/random-message', async (req, res) => {
  try {
    console.log("Before making the API request");
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',  // Use GPT-3.5 or GPT-4 if you have access
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Give me a random encouraging message for a new user.' }
      ],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  
    console.log("After the API request");  // This line will only print if the request succeeds
  
    // Continue with the message extraction
    const message = response.data.choices[0].message.content.trim(); 
    res.json({ message });
  } catch (error) {
    console.error("Error during API request:", error);  // Log the full error
    if (error.response) {
      console.error("Response error data:", error.response.data); // Additional response error details
    }
    res.status(500).json({ message: 'Error fetching message from OpenAI' });
  }
  
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
