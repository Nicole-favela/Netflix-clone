import React from 'react'
import './Banner.css'
import { useState , useEffect} from 'react';
import axios from "axios";
import url from '../constant.js'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { CardMedia } from '@mui/material';
import VideoPlayer from './VideoPlayer';
import { useSelector,useDispatch } from 'react-redux'
import { selectUser, currentlyPlaying, setPlaying} from '../features/userSlice'
import {jwtDecode} from 'jwt-decode'
import Cookies from 'js-cookie';
import { CONTENT_URLS, API_BASE_URL} from '../config/apiUrls.js';
import { addToPlayedList } from '../utils/addToPlayedList.js';

function Banner({fetchUserList,  fetchPlayedList, movieIdsOnList}) {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const token = Cookies.get('token')
    const decoded = jwtDecode(token)
    const user_id = decoded._id
    const [like, setLike] = useState(false)
    const [movie, setMovie] = useState([])
    const [openVideoPlayer, setOpenVideoPlayer] = useState(false)
    const [movieId, setMovieId] = useState(0)
    
    const fetchPopular = async () => {
        try {
          const res = await axios.get(CONTENT_URLS.POPULAR_MOVIES);
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
    async function addToList(movie){
      const movie_data = {
          rating: like,
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          user_id: user?.user_id || user_id,
          release_date: movie.release_date,
          poster: movie?.backdrop_path,
      

      }
      const res = await fetch(`${API_BASE_URL}/movie-list`, {
          method:"POST", //creates transaction
          body: JSON.stringify(movie_data),
          headers:{
            'content-type': "application/json", //makes sure json format is sent to backend
            Authorization: `Bearer ${token}`,
           
          }
        });
      if(res.ok){
        fetchUserList(user_id, token)
       
      }
   
  }
  
  function truncateDescription(string, cutoffChar){
    return string?.length > cutoffChar ? string.substr(0, cutoffChar -1) + '...' : string;

    }
    const handlePlay=(selection)=>{
      dispatch(setPlaying(movie))//add movie to play to global state
      setMovieId(selection?.id)
      setOpenVideoPlayer(true)
      addToPlayedList(selection, user_id, token, fetchPlayedList,  movieIdsOnList)
    
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
                <button className='banner__button' onClick={()=>handlePlay(movie)}>
                    <PlayArrowRoundedIcon className='banner__button-icon' fontSize='small' />
                    Play
                </button>
                <button className='banner__button' onClick={()=>addToList(movie)}>
                    + My List
                </button>
                <h1 className='banner__description'>
                    {/* cuts movie description to 150 characters  */}
                    {truncateDescription(movie?.overview, 190)}
                
                
                </h1>

                {/* test player here */}
                <CardMedia/>
                {(openVideoPlayer) && (
                    <VideoPlayer  openVideoPlayer={openVideoPlayer} setOpenVideoPlayer={setOpenVideoPlayer}  setMovieId={setMovieId}/>
                  
                )
                }
            </div>
        </div>

        <div className='banner--fadeBottom'/>
    </header>
  )
}

export default Banner