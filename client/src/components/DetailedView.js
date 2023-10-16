import * as React from 'react';

import Box from '@mui/material/Box';
import Player from './Player';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import useRecommendations from '../hooks/useRecommendations';
import useCredits from '../hooks/useCredits';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './DetailedView.css'
import { useSelector,useDispatch } from 'react-redux'
import { selectUser, setPlayingMovie, selectCurrentlyPlaying, selectIsPlaying, currentlyPlaying} from '../features/userSlice'
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useFetch from '../hooks/useFetch';
import VideoPlayer from './VideoPlayer';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 900,
  bgcolor: '#000000',
//   border: '4px solid #FF0D86',
  boxShadow: 100,

 
};

 export default function BasicModal({open, movies, movieIndex, handleClose, fetchUserList}) {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    
    const currentlyPlaying = useSelector(selectCurrentlyPlaying) //gets movie id of latest playing movie
   
    const [like, setLike] = useState(false)
    const [openVideoPlayer, setOpenVideoPlayer] = useState(false)
    const [movieId, setMovieId] = useState(0)
    const [credits, setCredits] = useState([])
    const movieSeed =movies[movieIndex]?.id 
    const recommendationsUrl = `http://localhost:3001/movie/recommendations?movie_id=${movieSeed}`
    const {data: recommendations,loading: recLoading ,error: recError} = useRecommendations(recommendationsUrl)

    //get credits for particular movie:
    const creditsUrl = `http://localhost:3001/movie/credits?movie_id=${movieSeed}`
    const {data: movieCredits,loading: creditsLoading ,error: creditsError} = useCredits(creditsUrl)
    const imgUrl = 'https://image.tmdb.org/t/p/original'
    if (creditsLoading || recLoading) {
      return <div>Loading...</div>;
    }
    
    
    function truncateDescription(string, cutoffChar){
        //console.log("string overview is: ", string)
        return string?.length > cutoffChar ? string.substr(0, cutoffChar -1) + '...' : string;
    
        }
    
    // }, [open, movieIndex])
    function getTop5CastMembers(credits){
      if(!credits || credits === undefined || credits === []){
        return ''
      }
      console.log('movie credits in top 5: ', credits?.cast)
      //const topFive = credits.cast.slice(0,5)
      //recommendations?.slice(0,10).map((recommendation,index)=>
      const castNames = credits?.cast?.slice(0,3).map((actor)=> actor.name)
      return castNames?.join(', ')
      //return " movie credits...."Player
    }
    function getProducers(credits){
      
      if(!credits || credits === undefined || credits === []){
        return ''
      }
      console.log('movie credits in producers: ', credits?.crew)
      const topFive = credits?.crew?.filter(res=> res.job === 'Executive Producer' || res.job === 'Director')
      const names = topFive?.slice(0,3).map((producer)=> producer.name)
      console.log('movie credits in producers: ', names)
      return names?.join(', ')
      //return " movie credits...."
    }
  
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
    
   
    const handlePlay=(selection)=>{
      console.log('in handle play movie id is: ', selection?.id)
      dispatch(setPlayingMovie(selection?.id))
      setMovieId(selection?.id)
      setOpenVideoPlayer(true)
      //handleOpenVideoPlayer()
   

    }
    async function deleteFromList(movie){
      console.log("the id to delete is: ", )
      console.log('the movie to delete is: ', movie?._id)
      const _id =  movie?._id
      const res = await fetch(`http://localhost:3001/movie-list/${_id}`, {
        method: "DELETE",
        
      });
      if(res.ok){
        fetchUserList() //updates and refetches transactions to display on table
        window.alert("Removed From List")
      }

    }
       
  return (
    
    <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h4" component="h2" sx={{color: 'white'}}>
           
          </Typography> */}
          {/* <Typography id="modal-modal-description" sx={{ mt: 6, color: 'white' }}>
            Movie title
          </Typography> */}

          {/* contents */}
    <header className='banner' style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies[movieIndex]?.backdrop_path || movies[movieIndex]?.poster}")`,
        backgroundPosition: "center center"
    }}>
     
        <div className='banner__contents'>
            <h4 className='banner__title'>
                    {movies[movieIndex]?.title ||  movies[movieIndex]?.original_title}
            </h4>
            <div className='banner__details'>
            {new Date(movies[movieIndex]?.release_date).getFullYear() }
                <h2 className='banner__description'>
                 
                  {truncateDescription(movies[movieIndex]?.overview, 200)}

                </h2>

            </div>

            <div className='banner__buttons'>
                <button className='detailedview__button'  onClick={()=>handlePlay(movies[movieIndex])}>
                    <PlayArrowRoundedIcon className='detailedview__button-icon' fontSize='small' />
                    Play
                </button>
                {movies[movieIndex]?.user_id !== undefined ? (
                   <button className='detailedview__button'  onClick={()=>deleteFromList(movies[movieIndex])}>
                   Remove
                    </button>
                
                ):
                <button className='detailedview__button'  onClick={()=>addToList(movies[movieIndex])}>
                + My List
                 </button>
               
                
                }
               
               
                <ThumbUpIcon
                    color="inherit" 
                    onClick={()=>setLike(true)}
                />

            
            </div>

            {/* credits: */}
           
              {creditsLoading ? (
              // show a loading indicator while data is being fetched
              <div className="detailedview__loading">
                Loading credits...
              </div>
            ) : (
              // render credits when available
              <div className="detailedview__credits">
                Cast: {getTop5CastMembers(movieCredits)}
                <br/>
                Creators: {getProducers(movieCredits)}
              </div>
            )}
            {(openVideoPlayer) &&  <VideoPlayer title={movies[movieIndex]?.title || movies[movieIndex]?.original_title} movieId ={movieId} openVideoPlayer={openVideoPlayer} setOpenVideoPlayer={setOpenVideoPlayer} setMovieId={setMovieId}/>  }

              {/* more related episode options */}
        {/* {!openVideoPlayer && ( */}
        <div className='detailedview__description'>              
                {(!recLoading && recommendations.length >=1) &&
                <>
                  <h3 className='detailedview__title'>
                  More Like This
                 </h3>
                  <div className='detailedview__posters'>
                     {recommendations?.slice(0,9).map((recommendation,index)=>
                        (recommendation.backdrop_path  && (
                            <div className='detailedview__container'>
                           
                              <img className='detailedview__poster' key = {index} src={`${imgUrl}${recommendation?.backdrop_path || recommendation?.poster_path}`} alt = {recommendation?.name}/>
                              <h4 className='detailedview__moviename'>{truncateDescription(recommendation?.title, 15)}</h4>
                            </div>
                        )
                    ))}
                 </div>
                 </>

                }
        
        </div>
        {/* )} */}

        </div>
        </header>
        </Box>
      </Modal>
    </div>
    
  );
  
}
