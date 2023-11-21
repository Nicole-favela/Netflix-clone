import ReactPlayer from 'react-player'
import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentlyPlaying } from '../features/userSlice'
import axios from 'axios'
import './Playerstyle.css'
import { API_BASE_URL } from '../config/apiUrls'


function Player({movieId, setOpen, setMovieId}) {
    const [isOpen, setIsOpen] = useState(true)
    const currentlyPlaying = useSelector(selectCurrentlyPlaying) //gets movie id of latest playing movie
   
    const [loading, setLoading]= useState(true)
    const [data, setData] = useState([])
    const [link, setLink] = useState('')
    let youtubeLink = ''
   
    useEffect(()=>{
        fetchVideoData();
    },[movieId, link]) 
    //allows you to close out video by clicking outside pop up
    useEffect(()=>{
        const closeVid = e=>{
            setOpen(false)
        }
        document.body.addEventListener( 'click',closeVid)
        return ()=> document.body.removeEventListener('click', closeVid)
    }, [])
   
    async function fetchVideoData(){
           
        try{
            const videosUrl = `${API_BASE_URL}/content/movie/trailers?movie_id=${movieId}`
            setLoading(true)
            const response = await axios.get(videosUrl)
            console.log('In player response is: ', response)
            setData(response.data.results)
            const youtubeLink = setYoutubeLink(response.data.results);
            console.log('In player YOUTUBE LINK Is: ', youtubeLink)
            setLink(youtubeLink);
            
        }catch(err){
            console.log('error getting video data')
        
        }finally{
            setLoading(false)
        }
    }
   
    //get trailer key for use in youtube link
    function getTrailerKey(res){
       
        if (res.length < 1){
            return null
        }
        const filtered_by_type = res.filter(res=> res.type === 'Featurette' || res.type === 'Clip' || res.type === 'Trailer')
        
        const minIndex = 0
        const maxIndex = filtered_by_type.length 
        
        const randomSelection = Math.floor(Math.random() * (maxIndex - minIndex) + minIndex)
       
        return filtered_by_type[randomSelection]?.key
    }
    function setYoutubeLink(res){
        const key = getTrailerKey(res)
        const youtubeLink = key ? `https://www.youtube.com/watch?v=${key}` : '';
       
        return youtubeLink;

    }
   
  return (
    <>
    {(link !== '') ? (
       
    <div className='player-wrapper' >
        <ReactPlayer
            playing
            // loop
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