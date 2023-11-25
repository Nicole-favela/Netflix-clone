

import * as dotenv from 'dotenv'

dotenv.config()
const API_KEY = process.env.API_KEY
const BASE_URL = process.env.BASE_URL
//https://api.themoviedb.org/3

export const getPopularMovies = async (req, res) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching movies data' });
    }
  };
  export const getComedyMovies = async (req, res) => {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=2&with_genres=35`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching comedy movies data' });
    }
  };
  export const getScifiMovies = async (req, res) => {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=878`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching scifi movies data' });
    }
  };
  export const getThrillerMovies = async (req, res) => {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=53`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching thriller movies data' });
    }
  };
  export const getCrimeMovies = async (req, res) => {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=80`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching crime movies data' });
    }
  };
  export const getActionMovies = async (req, res) => {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=28`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching action data' });
    }
  };
  export const getAnimatedMovies = async (req, res) => {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=16`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching animated data' });
    }
  };
  export const getHorrorMovies = async (req, res) => {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=27`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching horror data' });
    }
  };
export const getTrailers= async (req, res) => {
    try {
      const movie_id = req.query.movie_id
      const response = await fetch(`${BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching trailer data' });
    }
  };
  export const getCredits= async (req, res) => {
    try {
      const movie_id = req.query.movie_id
      const response = await fetch(`${BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching movie credits data' });
    }
  };
  export const getRecommendations= async (req, res) => {
    try {
        
      const movie_id = req.query.movie_id
      const response = await fetch(`${BASE_URL}/movie/${movie_id}/recommendations?api_key=${API_KEY}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching movie recommendations data' });
    }
  };


