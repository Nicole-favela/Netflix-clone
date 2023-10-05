import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Player from './Player';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
const playerstyle = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '50%',
    bgcolor: '#000000',
  //   border: '4px solid #FF0D86',
    boxShadow: 100,
    p: 4,
  
   
  };
  
export default function VideoPlayer({title, movieId, openVideoPlayer, setOpenVideoPlayer, setMovieId}){
    const handleCloseVideoPlayer =()=> setOpenVideoPlayer(false)
    const [open, setOpen] = useState(false)
    console.log('in vid player and movie id is: ', movieId)
    console.log('in vid player openVideoPlayer is: ',openVideoPlayer)
    return(
      <Modal
      open={openVideoPlayer}
      onClose={handleCloseVideoPlayer}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      
      <Box sx={playerstyle}>
        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{color: 'white'}}>
          {title} Trailer
         
        </Typography>
  
               <Box sx={{ position: 'absolute', top: 40, right: 40 }}>
                  <CloseIcon sx={{ color: 'gray' }} onClick={handleCloseVideoPlayer} />
              </Box>
           
           
             <Player movieId = {movieId} setOpen={setOpen} setMovieId={setMovieId}/>
            
      </Box>
    </Modal>
    )
  }