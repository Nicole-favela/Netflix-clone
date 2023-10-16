import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import Banner from '../components/Banner'
import ContentRow from '../components/ContentRow'
import useFetch from '../hooks/useFetch'
import useUserData from '../hooks/useUserData'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectMovies, selectUser, addMovie, selectCurrentlyPlaying, selectIsPlaying, selectTrailer } from '../features/userSlice'
import axios from 'axios'


function Home() {
  const user = useSelector(selectUser)
  const [update, setUpdate ]= useState(false)
  const dispatch= useDispatch(selectMovies, selectTrailer)
  //const dispatch = useDispatch(selectTrailer)
  
  const isPlaying = useSelector(selectIsPlaying)
  const [userMovieList, setUserMovieList] = useState([])
  const [loadingUserMovies, setLoadingUserMovies] = useState()
  const [horrorMovies, setHorrorMovies] = useState([]);
  const horrorUrl = 'http://localhost:3001/discover/horror'
  const popularUrl = 'http://localhost:3001/movie/popular'
  const comedyUrl = 'http://localhost:3001/discover/comedy'
  const scifiUrl= 'http://localhost:3001/discover/sci-fi'
  
  const actionUrl = 'http://localhost:3001/discover/action'
  const user_id = user.user_id
  const mylistUrl= `http://localhost:3001/movie-list/${user_id}`
  
  
  const {data: horrorData ,loading: horrorLoading ,error: horrorError} = useFetch(horrorUrl)
  const {data: actionData ,loading: actionLoading ,error: actionError} = useFetch(actionUrl)
  const {data: popularData ,loading: popularLoading ,error: popularError} = useFetch(popularUrl)
  const {data: comedyData ,loading: comedyLoading ,error: comedyError} = useFetch(comedyUrl)
  const {data: scifiData ,loading: scifiLoading ,error: scifiError} = useFetch( scifiUrl)
  
  
  useEffect(()=>{
    fetchUserList()

  },[])
  async function fetchUserList(){
    try{
      setLoadingUserMovies(true)
      const res = await axios.get(mylistUrl)
      console.log('********************** User movie list is: ',res.data.data)
      setUserMovieList(res.data.data)
      
  }catch(err){
      console.error(err)

  }
  finally{
       setLoadingUserMovies(false)
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
      
      />

      }
      {
        !horrorLoading &&
        <ContentRow
        title="Horror"
        movies= {horrorData}
        fetchUserList={fetchUserList}
      
      />
      }
        
        {!actionLoading &&
            <ContentRow
            title="Action"
            movies= {actionData}
            fetchUserList={fetchUserList}
          
          />

        }
        {
          !comedyLoading &&
            <ContentRow
            title="Comedies"
            movies= {comedyData}
            fetchUserList={fetchUserList}
          
          />
        }
          
          {!scifiLoading && 
            <ContentRow
            title="Scifi"
            movies= {scifiData}
            fetchUserList={fetchUserList}
          
          />

          }
        {!loadingUserMovies &&
          <ContentRow
          title="Your List"
          movies= {userMovieList}
          fetchUserList={fetchUserList}
        
        />


        }
         

    </div>
  )
}

export default Home