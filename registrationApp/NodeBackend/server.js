const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5001;
require('dotenv').config();

app.use(express.json());

app.get('/random-message', async (req, res) => {
  try {
    // Call OpenAI API to get a random message
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

    // Extract the random message
    const message = response.data.choices[0].message.content.trim();  // Ensure you're accessing the correct message part
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching message from OpenAI' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
