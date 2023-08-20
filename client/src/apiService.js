
// import useKey from "./useKey"
import axios from "axios";
import { useState } from "react";

 //const API_KEY = useKey()
async function fetchData({endpoint, apiKey}) {
    // const [movies, setMovies] = useState([])
    console.log("in fetchdata api key is: ",apiKey)
    
    try {
        //const res = await axios.get('http://localhost:3001/movie/popular');
        //       // Use res.data to access the response body
        //       setMovies(res.data.results);
        //       return res
      const res = await axios.get(`http://api.themoviedb.org/3${endpoint}?api_key=${apiKey}`);
    //   const data = await res.json();
    //   return data
      //setMovies(res.data.results)
      return res.data.results
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching data');
    }
  }

// Fetches popular movies
export function fetchPopularMovies(apiKey) {
    return fetchData('/movie/popular', apiKey);
  }
// Fetches movie genres
export function fetchMovieGenres(apiKey) {
    return fetchData('/genre/movie/list', apiKey);
  }
  