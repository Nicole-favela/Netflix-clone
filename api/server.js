const express = require('express')
const cors = require("cors")
require('dotenv').config()
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())
const API_KEY = process.env.API_KEY
const URL = process.env.BASE_URL
app.get('/movie/popular', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching movies data' });
    }
  });

app.listen(3001)