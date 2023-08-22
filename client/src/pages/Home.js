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
  const comedyUrl = 'http://localhost:3001/discover/comedy'
  const scifiUrl= 'http://localhost:3001/discover/sci-fi'
  
  const actionUrl = 'http://localhost:3001/discover/action'
  const {data: horrorData ,loading: horrorLoading ,error: horrorError} = useFetch(horrorUrl)
  const {data: actionData ,loading: actionLoading ,error: actionError} = useFetch(actionUrl)
  const {data: popularData ,loading: popularLoading ,error: popularError} = useFetch(popularUrl)
  const {data: comedyData ,loading: comedyLoading ,error: comedyError} = useFetch(comedyUrl)
  const {data: scifiData ,loading: scifiLoading ,error: scifiError} = useFetch( scifiUrl)
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

  console.log("horror movies in home are: ", horrorData)
  console.log("Action movies in home are: ", actionData)
  console.log("popular movies in home are: ", popularData)
  console.log("comedy movies in home are: ", comedyData)
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
          <ContentRow
          title="Comedies"
          movies= {comedyData}
        
        />
          <ContentRow
          title="Scifi"
          movies= {scifiData}
        
        />

    </div>
  )
}

export default Home