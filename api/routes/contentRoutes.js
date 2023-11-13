
import {Router} from 'express'
import express from 'express'

import cors from 'cors'
import * as dotenv from 'dotenv'

import bodyParser from 'body-parser'
//import connect from '../db/mongodb.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authenticateToken from '../utils/authenticate.js'


import User from '../models/usermodel.js'
dotenv.config()
const API_KEY = process.env.API_KEY

const router = Router();


router.get('/movie/popular', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching movies data' });
    }
  });
  router.get('/movie/trailers', async (req, res) => {
    try {
      const movie_id = req.query.movie_id
      //console.log('the movie id for trailers is: ', movie_id)
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`);
      const data = await response.json();
      //console.log('the movie data from trailers is :', data)
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching movie trailers' });
    }
  });
  router.get('/movie/recommendations', async (req, res) => {
    try {
      const movie_id = req.query.movie_id;
      //console.log("movie id is: ", movie_id)
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching movie recommendations' });
    }
  });
  router.get('/movie/credits', async (req, res) => {
    try {
      const movie_id = req.query.movie_id;
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`);
      const data = await response.json();
      //console.log('the data is: ', data)
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching credits' });
    }
  });
  router.get('/discover/horror', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=27`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching horror movies data' });
    }
  });
  //new genres:
  router.get('/discover/animation', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=16`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching animation data' });
    }
  });
  router.get('/discover/crime', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=80`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching crime movies data' });
    }
  });
  router.get('/discover/thrillers', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=53`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching thriller movies data' });
    }
  });



  //
  router.get('/discover/action', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=28`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching action movies data' });
    }
  });
  router.get('/discover/sci-fi', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=878`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching sci-fi movies data' });
    }
  });
  router.get('/discover/comedy', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=2&with_genres=35`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching comedy movies data' });
    }
  });
  export default router