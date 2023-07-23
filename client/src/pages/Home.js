import React from 'react'
import Nav from '../components/Nav'
import Banner from '../components/Banner'
import ContentRow from '../components/ContentRow'


function Home() {
  return (
    <div className="home">
        <Nav/>
        <Banner/>

        <ContentRow
          title="Trending movies"
        
        />
         <ContentRow
          title="More Trending Movies"
        
        />
         <ContentRow
          title="More Trending Movies"
        
        />

    </div>
  )
}

export default Home