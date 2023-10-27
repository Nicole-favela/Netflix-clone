import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import Banner from '../components/Banner'
import ContentRow from '../components/ContentRow'
import useFetch from '../hooks/useFetch'
import useUserData from '../hooks/useUserData'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectMovies, selectUser, addMovie, selectCurrentlyPlaying, selectIsPlaying, selectTrailer, selectRecentlyPlayed, setRecentlyPlayedMovie } from '../features/userSlice'
import axios from 'axios'


function Home() {
  const user = useSelector(selectUser)
  const [update, setUpdate ]= useState(false)
  const dispatch= useDispatch(selectRecentlyPlayed)
  //const dispatch = useDispatch(selectTrailer)
  //const recentlyPlayed = useSelector(selectRecentlyPlayed)
  const isPlaying = useSelector(selectIsPlaying)
  const [userMovieList, setUserMovieList] = useState([])
  const [playedMovies, setPlayedMovie] = useState([])
  const [loadingUserMovies, setLoadingUserMovies] = useState()
  const [loadingPlayedMovies, setLoadingPlayedMovies] = useState()
  const [horrorMovies, setHorrorMovies] = useState([]);
  const horrorUrl = 'http://localhost:3001/discover/horror'
  const popularUrl = 'http://localhost:3001/movie/popular'
  const comedyUrl = 'http://localhost:3001/discover/comedy'
  const scifiUrl= 'http://localhost:3001/discover/sci-fi'
  
  const actionUrl = 'http://localhost:3001/discover/action'
  const animationUrl = 'http://localhost:3001/discover/animation'
  const crimeUrl = 'http://localhost:3001/discover/crime'
  const thrillersUrl = 'http://localhost:3001/discover/thrillers'
  const user_id = user.user_id
  const mylistUrl= `http://localhost:3001/movie-list/${user_id}`
  const myPlayedMoviesUrl= `http://localhost:3001/movie-list/recently-watched/${user_id}`
  
  const {data: horrorData ,loading: horrorLoading ,error: horrorError} = useFetch(horrorUrl)
  const {data: actionData ,loading: actionLoading ,error: actionError} = useFetch(actionUrl)
  const {data: popularData ,loading: popularLoading ,error: popularError} = useFetch(popularUrl)
  const {data: comedyData ,loading: comedyLoading ,error: comedyError} = useFetch(comedyUrl)
  const {data: scifiData ,loading: scifiLoading ,error: scifiError} = useFetch( scifiUrl)
  const {data: animationData ,loading: animationLoading ,error: animationError} = useFetch(animationUrl)
  const {data: crimeData ,loading: crimeLoading ,error: crimeError} = useFetch(crimeUrl)
  const {data: thrillersData ,loading: thrillersLoading ,error: thrillersError} = useFetch(thrillersUrl)
  
  
  useEffect(()=>{
    fetchUserList()
    fetchPlayedList()

  },[])
  async function fetchUserList(){
    try{
      setLoadingUserMovies(true)
      const res = await axios.get(mylistUrl)
      //console.log('********************** User movie list is: ',res.data.data)
      setUserMovieList(res.data.data)
      console.log('inn home, user movies list is: ', userMovieList)
      
  }catch(err){
      console.error(err)

  }
  finally{
       setLoadingUserMovies(false)
}
}
async function fetchPlayedList(){
  try{
    setLoadingPlayedMovies(true)
    const res = await axios.get(myPlayedMoviesUrl)
   
    setPlayedMovie(res.data.data)
    console.log('inn home, played list is: ',playedMovies)
    
}catch(err){
    console.error(err)

}
finally{
  setLoadingPlayedMovies(false)
  
}
}

  

  if(horrorError){
      console.log(horrorError)
  }
  if(actionError){
    console.log(actionError)
}
if(popularError){
  console.log(popularError)
}
if(comedyError){
  console.log(comedyError)
}
if(scifiError){
  console.log(scifiError)
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
        <Banner fetchUserList={fetchUserList}/>
        
      {!popularLoading &&
        <ContentRow
        title="Trending"
        movies= {popularData}
        fetchUserList={fetchUserList}
        fetchPlayedList={fetchPlayedList}
      
      />

      }
      {/* recently played section: */}
      {(!loadingPlayedMovies) ? (
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
        {!loadingUserMovies &&
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