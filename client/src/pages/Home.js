import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import Banner from '../components/Banner'
import ContentRow from '../components/ContentRow'
import useFetch from '../hooks/useFetch'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectMovies, selectUser, addMovieToList } from '../features/userSlice'
import axios from 'axios'
import Cookies from 'js-cookie'
import useUserId from '../hooks/useUserId'
import {jwtDecode} from 'jwt-decode'
import {API_BASE_URL, CONTENT_URLS} from '../config/apiUrls'


function Home() {
  const user = useSelector(selectUser)
  
  //const dispatch= useDispatch(selectRecentlyPlayed)
  const [userMovieList, setUserMovieList] = useState([])
  const [playedMovies, setPlayedMovie] = useState([])
  const [loadingUserMovies, setLoadingUserMovies] = useState()
  const [loadingPlayedMovies, setLoadingPlayedMovies] = useState()

  const horrorUrl = CONTENT_URLS.HORROR
  const popularUrl = CONTENT_URLS.POPULAR_MOVIES
  const comedyUrl = CONTENT_URLS.COMEDY
  const scifiUrl= CONTENT_URLS.SCIFI
  const actionUrl = CONTENT_URLS.ACTION
  const animationUrl = CONTENT_URLS.ANIMATION
  const crimeUrl = CONTENT_URLS.CRIME
  const thrillersUrl = CONTENT_URLS.THRILLER
  
  const {data: horrorData ,loading: horrorLoading ,error: horrorError} = useFetch(horrorUrl)
  const {data: actionData ,loading: actionLoading ,error: actionError} = useFetch(actionUrl)
  const {data: popularData ,loading: popularLoading ,error: popularError} = useFetch(popularUrl)
  const {data: comedyData ,loading: comedyLoading ,error: comedyError} = useFetch(comedyUrl)
  const {data: scifiData ,loading: scifiLoading ,error: scifiError} = useFetch( scifiUrl)
  const {data: animationData ,loading: animationLoading ,error: animationError} = useFetch(animationUrl)
  const {data: crimeData ,loading: crimeLoading ,error: crimeError} = useFetch(crimeUrl)
  const {data: thrillersData ,loading: thrillersLoading ,error: thrillersError} = useFetch(thrillersUrl)
  
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
      const token = Cookies.get('token')
      if(!token){
        return
      }
      const decoded = await jwtDecode(token)
      const user_id = decoded._id
      
      if(user_id){
      
        await fetchUserList(user_id, token)
        await fetchPlayedList(user_id, token)

      }
     

    }catch(e){
      console.log('error fetching users data: ', e)

    }
}
fetchData()
    
    
  },[])
  
  async function fetchUserList(user_id,  token){
      try{       
        const mylistUrl= `${API_BASE_URL}/movie-list/${user_id}`
    
        setLoadingUserMovies(true)
        const headers = {'Authorization': `Bearer ${token}`}
        const res = await axios.get(mylistUrl, {headers})
        console.log('fetch user list is ', res.data.data)
        // Extract all movie IDs 
        const movieIdsOnList = res.data.data.map(movie => movie.id);
        //dispatch(addMovieToList(movieIdsOnList))
       
        setUserMovieList(res.data.data)
  
  }catch(err){
      console.error(err)

  }
  finally{
       setLoadingUserMovies(false)
}
}
async function fetchPlayedList(user_id, token){
  try{
 
    const headers = {'Authorization': `Bearer ${token}`}
    const myPlayedMoviesUrl= `${API_BASE_URL}/movie-list/recently-watched/${user_id}`
    const res = await axios.get(myPlayedMoviesUrl, {headers})
    console.log('fetch played list is ', res.data)
   
    setPlayedMovie(res.data.data)
    
  }catch(err){
      console.error(err)

  }
  finally{
    setLoadingPlayedMovies(false)
    
  }
}


  if (horrorLoading) {
    return <div>Loading...</div>;
  }
  if (actionLoading) {
    return <div>Loading...</div>;
  }
  if (popularLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
        <Nav/>
        <Banner fetchUserList={fetchUserList}  fetchPlayedList={fetchPlayedList} movieIdsOnList/>
        
      {!popularLoading &&
        <ContentRow
        title="Trending"
        movies= {popularData}
        fetchUserList={fetchUserList}
        fetchPlayedList={fetchPlayedList}
      
      />

      }
      {/* recently played section: */}
      {(!loadingPlayedMovies && playedMovies.length > 0) ? (
      <ContentRow
        title="Watch It Again"
        movies={playedMovies}
        fetchUserList={fetchUserList}
        fetchPlayedList={fetchPlayedList}
      />
    ) : (
      
      <div>Loading...</div>
    )}
      {
        !horrorLoading &&
        <ContentRow
        title="Horror"
        movies= {horrorData}
        fetchUserList={fetchUserList}
        fetchPlayedList={fetchPlayedList}
      
      />
      }
        
        {!actionLoading &&
            <ContentRow
            title="Action"
            movies= {actionData}
            fetchUserList={fetchUserList}
            fetchPlayedList={fetchPlayedList}
          
          />

        }
        {
          !comedyLoading &&
            <ContentRow
            title="Comedies"
            movies= {comedyData}
            fetchUserList={fetchUserList}
            fetchPlayedList={fetchPlayedList}
          
          />
        }
          
          {!scifiLoading && 
            <ContentRow
            title="Scifi"
            movies= {scifiData}
            fetchUserList={fetchUserList}
            fetchPlayedList={fetchPlayedList}
          
          />

          }
          {/* new genres added */}
          {!animationLoading && 
            <ContentRow
            title="Animated Movies"
            movies= {animationData}
            fetchUserList={fetchUserList}
            fetchPlayedList={fetchPlayedList}
          
          />

          }
            {!crimeLoading && 
            <ContentRow
            title="Crime & True Crimes"
            movies= {crimeData}
            fetchUserList={fetchUserList}
            fetchPlayedList={fetchPlayedList}
          
          />

          }
            {!thrillersLoading && 
            <ContentRow
            title="Thrillers"
            movies= {thrillersData}
            fetchUserList={fetchUserList}
            fetchPlayedList={fetchPlayedList}
          
          />

          }
        {(!loadingUserMovies && userMovieList.length > 0) &&
          <ContentRow
          title="Your List"
          movies= {userMovieList}
          fetchUserList={fetchUserList}
          fetchPlayedList={fetchPlayedList}
        
        />
        }
         

    </div>
  )
}

export default Home