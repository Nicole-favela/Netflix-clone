import React from 'react'
import './Banner.css'
import { useState , useEffect} from 'react';
import axios from "axios";
import url from '../constant.js'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { CardMedia } from '@mui/material';

function Banner() {
    const [movie, setMovie] = useState([])
    const fetchPopular = async () => {
        try {
          const res = await axios.get('http://localhost:3001/movie/popular');
          // Use res.data to access the response body
          setMovie(res.data.results[Math.floor(Math.random() * res.data.results.length -1)]);
          return res
        } catch (error) {
          console.error(error);
        }
        
      };
    //fetch a popular movie from api each time page loads
    useEffect(()=>{
        fetchPopular()
    
    },[])
    console.log('the movies are: ', movie)
  function truncateDescription(string, cutoffChar){
    console.log("string overview is: ", string)
    return string?.length > cutoffChar ? string.substr(0, cutoffChar -1) + '...' : string;

    }
  return (
    <header className='banner' style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center"
    }}>
        

        <div className='banner__contents'>
            <h1 className='banner__title'>
                {movie?.title ||  movie?.original_title}
            </h1>
            <div className='banner__buttons'>
                <button className='banner__button'>
                    <PlayArrowRoundedIcon className='banner__button-icon' fontSize='small' />
                    Play
                </button>
                <button className='banner__button'>
                    + My List
                </button>
                <h1 className='banner__description'>
                    {/* cuts movie description to 150 characters  */}
                    {truncateDescription(movie?.overview, 150)}
                
                
                </h1>

                {/* test player here */}
                <CardMedia/>
            </div>
        </div>

        <div className='banner--fadeBottom'/>
    </header>
  )
}

export default Banner