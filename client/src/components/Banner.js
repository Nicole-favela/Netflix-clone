import React from 'react'
import './Banner.css'
import { useState , useEffect} from 'react';
import axios from "axios";
import url from '../constant.js'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { CardMedia } from '@mui/material';
import VideoPlayer from './VideoPlayer';
import { useSelector,useDispatch } from 'react-redux'
import { selectUser, currentlyPlaying} from '../features/userSlice'

function Banner({fetchUserList}) {
  const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [like, setLike] = useState(false)
    const [movie, setMovie] = useState([])
    const [openVideoPlayer, setOpenVideoPlayer] = useState(false)
    const [movieId, setMovieId] = useState(0)
    
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
    async function addToList(movie){
     
      //console.log('you added movie: ', movie, 'to your list!!!!')
      const movie_data = {
          rating: like,
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          user_id: user.user_id,
          release_date: movie.release_date,
          poster: movie?.backdrop_path,
      

      }
      const res = await fetch("http://localhost:3001/movie-list", {
          method:"POST", //creates transaction
          body: JSON.stringify(movie_data),
          headers:{
            'content-type': "application/json", //makes sure json format is sent to backend
           
          }
        });
      if(res.ok){
        fetchUserList()
       
      }
   
  }
    //console.log('the movies are: ', movie)
  function truncateDescription(string, cutoffChar){
    return string?.length > cutoffChar ? string.substr(0, cutoffChar -1) + '...' : string;

    }
    const handlePlay=(selection)=>{
      //console.log('in banner movie id is: ', selection?.id)
      //dispatch(setPlayingMovie(selection?.id))
      setMovieId(selection?.id)
      //console.log('we are setting the vide player to true in banner')
      setOpenVideoPlayer(true)
      //handleOpenVideoPlayer()
   

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
                {/* {title, movieId, openVideoPlayer, setOpenVideoPlayer, setMovieId}){ */}
                {(openVideoPlayer) && (
                    <VideoPlayer title={movie?.title ||  movie?.original_title} movieId = {movieId} openVideoPlayer={openVideoPlayer} setOpenVideoPlayer={setOpenVideoPlayer}  setMovieId={setMovieId}/>
                  
                )
                
                 
                }
            </div>
        </div>

        <div className='banner--fadeBottom'/>
    </header>
  )
}

export default Banner