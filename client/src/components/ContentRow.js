import React, { useEffect, useState } from 'react'
import './ContentRow.css'
import axios from 'axios';
import BasicModal from './DetailedView';

function ContentRow({title, movies, fetchUserList}) {
  
  const imgUrl = 'https://image.tmdb.org/t/p/original/'
  const [movieIndex, setMovieIndex] = useState(0)

  //for modal:
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = (i)=>{
    setOpen(true)
    console.log('the movie index is: ', i)
    setMovieIndex(i)
    console.log('movie index set to: ', movieIndex)
  }
  const handleClose = () => setOpen(false);
 
 
  console.log("movies for content row are: ", movies)
  function showMoreInfo(){
    return
  }
  return (
    <div className='row'>
        
        <h2>{title}</h2>
        <div className='row__posters'>
        <BasicModal open={open} movies={movies} movieIndex = {movieIndex} handleClose={handleClose} fetchUserList={fetchUserList}/>
       

        {movies.map((movie,index)=>
            ((movie.backdrop_path || movie.poster) && (
            <img className= 'row__poster'  onClick={()=>handleOpen(index)} key = {movie.id} src={`${imgUrl}${movie.backdrop_path ? movie.backdrop_path : movie?.poster}`} alt = {movie.name}/>
            )
        ))}
        </div>
        
    </div>
  )
}

export default ContentRow