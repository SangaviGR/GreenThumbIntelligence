require('dotenv').config(); // Load environment variables from .env file
const axios = require('axios');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection'); // Import the mongoose connection
// const router = require("./routes");
const multer = require('multer');
const sharp = require('sharp');
const MAX_IMAGE_SIZE = 1024 * 1024 * 2; // 2MB
// Set up storage configuration for multer
const storage = multer.memoryStorage(); // Stores the file in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMAGE_SIZE },
}); // Initialize multer with storage config
const cors = require('cors');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

// Create a new Apollo server and pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});
// Enable CORS for all routes
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
// app.use("/api", router);

const API_KEY = 'dymwiKhUbayQ4PDl8RWBFeu1Y9Sn46KtHvK47vcajKytpOxxIS'; 

app.post('/api/identify-plant', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image is required' });
  }

  const { latitude = 0, longitude = 0, similar_images = true, async = false, details, language = 'en' } = req.body;

  const base64Image = req.file.buffer.toString('base64');
  const imageData = `data:${req.file.mimetype};base64,${base64Image}`;

  const payload = {
    images: [imageData],
    latitude,
    longitude,
    similar_images,
  };

  if (details) payload.details = details;
  if (language) payload.language = language;
  if (async) payload.async = true;

  try {
    const response = await axios.post(
      'https://plant.id/api/v3/identification',
      payload,
      {
        headers: {
          'Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Plant ID Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to identify plant',
      details: error.response?.data || error.message,
    });
  }
});


app.get('/api/plant-details', async (req, res) => {
  const { access_token } = req.query;

  if (!access_token) {
      return res.status(400).json({ error: 'Access token is required' });
  }

  const details = [
      "common_names", "url", "description", "taxonomy", "rank",
      "gbif_id", "inaturalist_id", "image", "synonyms",
      "edible_parts", "watering", "propagation_methods"
  ].join(',');

  const url = `https://plant.id/api/v3/kb/plants/${access_token}?details=${encodeURIComponent(details)}&language=en`;

  try {
      const response = await axios.get(url, {
          headers: {
              'Api-Key': API_KEY,
              'Content-Type': 'application/json'
          }
      });

      if (response.headers['content-type'].includes('application/json')) {
          res.json(response.data);
      } else {
          res.status(500).json({ error: 'Unexpected Response', details: response.data });
      }
  } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to fetch plant details', details: error.response ? error.response.data : error.message });
  }
});

app.get('/api/search-plant', async (req, res) => {
  const { name } = req.query;

  if (!name) {
      return res.status(400).json({ error: 'Plant name is required' });
  }

  
  const url = `https://plant.id/api/v3/kb/plants/name_search?q=${encodeURIComponent(name)}`;

  try {
      const response = await axios.get(url, {
          headers: {
              'Api-Key': API_KEY,
              'Content-Type': 'application/json'
          }
      });

      // Ensure response is JSON
      if (response.headers['content-type'].includes('application/json')) {
          res.json(response.data);
      } else {
          res.status(500).json({ error: 'Unexpected Response', details: response.data });
      }
  } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to fetch data', details: error.response ? error.response.data : error.message });
  }
});

// Health Assessment Endpoint
app.post('/api/health-assessment', async (req, res) => {
    const { images, latitude, longitude, similar_images } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const url = 'https://plant.id/api/v3/health_assessment';
    const headers = {
        'Api-Key': 'dymwiKhUbayQ4PDl8RWBFeu1Y9Sn46KtHvK47vcajKytpOxxIS', // Replace with actual API key
        'Content-Type': 'application/json'
    };

    const data = {
        images: images || [],
        latitude,
        longitude,
        similar_images: similar_images ?? true
    };

    try {
        const response = await axios.post(url, data, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: 'Error fetching health assessment',
            details: error.response?.data || error.message
        });
    }
});

app.post('/api/chatbot', async (req, res) => {
    const { question, prompt = '', temperature = 0.5, app_name = 'MyAppBot' } = req.body;
  
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
  
    const url = 'https://plant.id/api/v3/identification/43igHic7zpYUYNA/conversation';
    const headers = {
      'Api-Key': 'dymwiKhUbayQ4PDl8RWBFeu1Y9Sn46KtHvK47vcajKytpOxxIS',
      'Content-Type': 'application/json'
      // Add authorization or API key header here if needed
    };
  
    const payload = {
      question,
      prompt,
      temperature,
      app_name
    };
  
    try {
      const response = await axios.post(url, payload, { headers });
      res.json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        error: 'Error communicating with chatbot API',
        details: error.response?.data || error.message
      });
    }
  });


app.get('/api/plant-info', async (req, res) => {
  const { name } = req.query;

  if (!name) {
      return res.status(400).json({ error: 'Plant name is required' });
  }

  try {
      // Step 1: Search for the plant
      const searchUrl = `https://plant.id/api/v3/kb/plants/name_search?q=${encodeURIComponent(name)}`;
      const searchResponse = await axios.get(searchUrl, {
          headers: { 'Api-Key': API_KEY, 'Content-Type': 'application/json' }
      });

      // Ensure we have results
      if (!searchResponse.data.entities || searchResponse.data.entities.length === 0) {
          return res.status(404).json({ error: 'No plant found with this name' });
      }

      // Get the first matching plant's access token
      const accessToken = searchResponse.data.entities[0].access_token;

      // Step 2: Fetch detailed plant info
      const details = [
          "common_names", "url", "description", "taxonomy", "rank",
          "gbif_id", "inaturalist_id", "image", "synonyms",
          "edible_parts", "watering", "propagation_methods"
      ].join(',');

      const detailUrl = `https://plant.id/api/v3/kb/plants/${accessToken}?details=${encodeURIComponent(details)}&language=en`;
      const detailResponse = await axios.get(detailUrl, {
          headers: { 'Api-Key': API_KEY, 'Content-Type': 'application/json' }
      });

      res.json(detailResponse.data);

  } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to fetch plant details', details: error.response ? error.response.data : error.message });
  }
});

// Serve up static assets from the React client/build directory when in production
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  
  // Apply Apollo server middleware to the Express app
  server.applyMiddleware({ app });

  // Ensure the database connection is open before starting the server
  db.connection.once('open', () => { // Use db.connection.once here
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
