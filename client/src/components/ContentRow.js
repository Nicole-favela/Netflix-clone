import React, { useEffect, useState } from 'react'
import './ContentRow.css'
import axios from 'axios';
import BasicModal from './DetailedView';
import { useSelector,useDispatch } from 'react-redux'
import { setPlayingMovie, selectCurrentlyPlaying, selectIsPlaying, currentlyPlaying} from '../features/userSlice'

function ContentRow({title, movies, fetchUserList, fetchPlayedList}) {
  const dispatch = useDispatch()
 
  const imgUrl = 'https://image.tmdb.org/t/p/original/'
  
  const [movieIndex, setMovieIndex] = useState(0)
   
  //for modal:
  const [open, setOpen] = React.useState(false);
 
 
  const handleOpen = (i, movie)=>{
    setOpen(true)
    console.log('the movie index is: ', i)
    setMovieIndex(i)
    console.log('movie index set to: ', movieIndex)
  
  }
  const handleClose = () => {
    setOpen(false);
    // dispatch(stopPlayingMovie())
    
  }

  return (
    <div className='row'>
        
        <h2>{title}</h2>
        <div className='row__posters'>
        <BasicModal open={open} movies={movies} movieIndex = {movieIndex} handleClose={handleClose} fetchUserList={fetchUserList} fetchPlayedList={fetchPlayedList}/>
       

        {movies.map((movie,index)=>
            ((movie.backdrop_path || movie.poster) && (
            <img className= 'row__poster'  onClick={()=>handleOpen(index, movie)} key = {movie.id} src={`${imgUrl}${movie.backdrop_path ? movie.backdrop_path : movie?.poster}`} alt = {movie.name}/>
            )
        ))}
        </div>
        
    </div>
  )
}

export default ContentRow