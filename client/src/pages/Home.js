import React from 'react'
import Nav from '../components/Nav'
import Banner from '../components/Banner'
import ContentRow from '../components/ContentRow'
import useFetch from '../hooks/useFetch'
import { useState } from 'react'



function Home() {
 
  const [horrorMovies, setHorrorMovies] = useState([]);
  const horrorUrl = 'http://localhost:3001/discover/horror'
  const popularUrl = 'http://localhost:3001/movie/popular'
  
  const actionUrl = 'http://localhost:3001/discover/action'
  const {data: horrorData ,loading: horrorLoading ,error: horrorError} = useFetch(horrorUrl)
  const {data: actionData ,loading: actionLoading ,error: actionError} = useFetch(actionUrl)
  const {data: popularData ,loading: popularLoading ,error: popularError} = useFetch(popularUrl)
  console.log("horror data in home is: ", horrorData)
  //console.log("action data in home is: ", actionData)
  

  if(horrorError){
      console.log(horrorError)
  }
  if(actionError){
    console.log(actionError)
}
if(popularError){
  console.log(popularError)
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

  console.log("horror movies in home are: ", horrorData)
  console.log("Action movies in home are: ", actionData)
  console.log("popular movies in home are: ", popularData)
  return (
    <div className="home">
        <Nav/>
        <Banner/>
        

        <ContentRow
          title="Trending"
          movies= {popularData}
        
        />
         <ContentRow
          title="Horror"
          movies= {horrorData}
         
          
         
        
        />
         <ContentRow
          title="Action"
          movies= {actionData}
        
        />

    </div>
  )
}

export default Home