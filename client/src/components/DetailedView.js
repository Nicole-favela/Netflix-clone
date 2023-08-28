import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import useRecommendations from '../hooks/useRecommendations';
import './DetailedView.css'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 900,
  bgcolor: '#000000',
//   border: '4px solid #FF0D86',
  boxShadow: 100,

 
};

export default function BasicModal({open, movies, movieIndex, handleClose}) {
    const movieSeed =movies[movieIndex]?.id
    const recommendationsUrl = `http://localhost:3001/movie/recommendations?movie_id=${movieSeed}`
    const {data: recommendations,loading: recLoading ,error: recError} = useRecommendations(recommendationsUrl)
    const imgUrl = 'https://image.tmdb.org/t/p/original/'
    if(recError){
        console.log("error loading recommendations in modal")
    }
    if(!recLoading){
        console.log("movie recs are: ", recommendations)
    }
    function truncateDescription(string, cutoffChar){
        console.log("string overview is: ", string)
        return string?.length > cutoffChar ? string.substr(0, cutoffChar -1) + '...' : string;
    
        }
       
  return (
    <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h4" component="h2" sx={{color: 'white'}}>
           
          </Typography> */}
          {/* <Typography id="modal-modal-description" sx={{ mt: 6, color: 'white' }}>
            Movie title
          </Typography> */}

          {/* contents */}
        <header className='banner' style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies[movieIndex]?.backdrop_path}")`,
        backgroundPosition: "center center"
    }}>
        <div className='banner__contents'>
            <h4 className='banner__title'>
                    {movies[movieIndex]?.title ||  movies[movieIndex]?.original_title}
            </h4>
            <div className='banner__details'>
            {new Date(movies[movieIndex]?.release_date).getFullYear() }
                <h2 className='banner__description'>
                 
                  {truncateDescription(movies[movieIndex]?.overview, 150)}

                </h2>

            </div>

            <div className='banner__buttons'>
                <button className='detailedview__button'>
                    <PlayArrowRoundedIcon className='detailedview__button-icon' fontSize='small' />
                    Play
                </button>
                <button className='detailedview__button'>
                    + My List
                </button>
             

                {/* test player here */}
                {/* <CardMedia/> */}
            </div>

              {/* more related episode options */}
        <div className='detailedview__description'>
           <h3 className='detailedview__title'>
                More Like This
                </h3>
              
                {!recLoading &&
                  <div className='detailedview__posters'>
                     {recommendations?.slice(0,10).map((recommendation,index)=>
                        (recommendation.backdrop_path && (
                            <div className='detailedview__container'>
                           
                              
                            
                              <img className='detailedview__poster' key = {index} src={`${imgUrl}${recommendation?.backdrop_path}`} alt = {recommendation?.name}/>
                              <h4 className='detailedview__moviename'>{truncateDescription(recommendation?.title, 20)}</h4>
                            </div>
                        )
                    ))}
                 </div>

                }
              
               
          
        </div>
            

        </div>
        
        </header>

        </Box>
      </Modal>
    </div>
  );
}