import ReactPlayer from 'react-player'
import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentlyPlaying } from '../features/userSlice'
import axios from 'axios'
import './Playerstyle.css'


function Player({movieId, setMovieId}) {
    
    const currentlyPlaying = useSelector(selectCurrentlyPlaying) //gets movie id of latest playing movie
    console.log('in player, currently playing is: ', currentlyPlaying)
    
    //const {data: videoData ,loading: videoInfoLoading ,error: videoError} = useFetch(videosUrl)
    const [loading, setLoading]= useState(true)
    const [data, setData] = useState([])
    const [link, setLink] = useState('')
    let youtubeLink = ''
   
    useEffect(()=>{
       
        fetchVideoData();
        console.log('data has loaded in player and is: ', data)
        console.log('the movie id is: ', movieId)
     
    },[movieId]) 
   
    //setLink(setYoutubeLink(data))
   
    async function fetchVideoData(){
           
        try{
            const videosUrl = `http://localhost:3001/movie/trailers?movie_id=${movieId}`
            setLoading(true)
            const response = await axios.get(videosUrl)
            console.log('response is: ', response)
            setData(response.data.results)
            const youtubeLink = setYoutubeLink(response.data.results);
            setLink(youtubeLink);
            
        }catch(err){
            console.log('error getting video data')
        
        }finally{
            setLoading(false)
        }
    }
   
    
    
    
    //const link = setYoutubeLink(key)
    function getTrailerKey(res){
        if (res.length < 1){
            return null
        }
        const filtered_by_type = res.filter(res=> res.type === ('Trailer' ||'Clip'))
        console.log('the filtered keys are: ', filtered_by_type)
        const minIndex = 0
        const maxIndex = filtered_by_type.length 
        //return filtered_by_type[0]?.key
        const randomSelection = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex)
        console.log('the random selection is: ', randomSelection)
        return filtered_by_type[randomSelection]?.key
    }
    function setYoutubeLink(res){
        const key = getTrailerKey(res)
        const youtubeLink = key ? `https://www.youtube.com/watch?v=${key}` : '';
        console.log('the link is: ', youtubeLink)
        return youtubeLink;

    }
    console.log('data is set!!!!')
    console.log(data)
    console.log(link)
    
  

  return (
    <>
    {(link !== '') ? (
    <div className='player-wrapper'>
        <ReactPlayer
            playing
            loop
            controls={true}
            volume={1}
            url={link}
            config={{
                youtube: {
                  playerVars: { showinfo: 1 }
                },
            }}
            width= '1100px'
            height='400px'


        />

    </div>

    )
      :(
        <p>Trailer not yet available for this title</p>

      )
    
        }
     </>
  )
}

export default Player