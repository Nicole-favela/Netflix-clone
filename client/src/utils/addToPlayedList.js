import { useState } from "react";
import { API_BASE_URL } from "../config/apiUrls";
export async function addToPlayedList(movie, user_id, token, fetchPlayedList, movieIdsOnList){
    const  movieIdToCheck = movie?.id
    const isMovieInList = movieIdToCheck && Array.isArray(movieIdsOnList) && movieIdsOnList.includes(movieIdToCheck);
    
    const movie_data = {
      played: true,
      on_my_list: isMovieInList,
      rating: false,
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      user_id: user_id,
      release_date: movie.release_date,
      poster: movie?.backdrop_path,
  

  }
  console.log('before fetch in add to played list: ',movie_data.on_my_list)
  const res = await fetch(`${API_BASE_URL}/movie-list/recently-watched`, {
      method:"POST", //creates movie
      body: JSON.stringify(movie_data),
      headers:{
        'content-type': "application/json", //makes sure json format is sent to backend
        Authorization: `Bearer ${token}`,
       
      }
    });
  if(res.ok){
    fetchPlayedList(user_id, token)
 
  }
  
  

  }