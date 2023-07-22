import React from 'react'
import Nav from './components/Nav'
import Banner from './components/Banner'
import ContentRow from './components/ContentRow'


function Home() {
  return (
    <div className="home">
        <Nav/>
        <Banner/>

        <ContentRow
          title="This is the first item in the row"
        
        />

    </div>
  )
}

export default Home