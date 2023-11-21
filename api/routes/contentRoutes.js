
import {Router} from 'express'

import * as dotenv from 'dotenv'
import {getPopularMovies, getTrailers, getHorrorMovies, getAnimatedMovies, getActionMovies, getCredits, getCrimeMovies, getThrillerMovies, getScifiMovies, getComedyMovies, getRecommendations} from '../controllers/contentController.js'

dotenv.config()


const router = Router();

router.get('/movie/popular', getPopularMovies)

router.get('/movie/trailers', getTrailers)
 
router.get('/movie/recommendations',getRecommendations)
 
router.get('/movie/credits', getCredits)
 
router.get('/discover/horror', getHorrorMovies)

router.get('/discover/animation', getAnimatedMovies)
  
router.get('/discover/crime',getCrimeMovies)
 
router.get('/discover/thrillers', getThrillerMovies)
 
router.get('/discover/action', getActionMovies)
  
router.get('/discover/sci-fi', getScifiMovies)
  
router.get('/discover/comedy',getComedyMovies )
 
export default router