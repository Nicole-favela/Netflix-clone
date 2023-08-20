import React, { useEffect, useState } from 'react'
import './ContentRow.css'
import axios from 'axios';

function ContentRow({title, movies}) {
  //const [movies, setMovies] = useState([])
  const imgUrl = 'https://image.tmdb.org/t/p/original/'
 
  console.log("movies for content row are: ", movies)
  return (
    <div className='row'>
        
        <h2>{title}</h2>
        <div className='row__posters'>
        {movies.map(movie=>
            (movie.backdrop_path && (
            <img className= 'row__poster' key = {movie.id} src={`${imgUrl}${movie?.backdrop_path}`} alt = {movie.name}/>
            )
        ))}
        </div>
        
    </div>
  )
}

export default ContentRow