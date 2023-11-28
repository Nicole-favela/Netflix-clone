import {Router} from 'express'

import authenticateToken from '../utils/authenticate.js'

import { addMovieToList, addToRecentlyWatched, deleteMovie, getRecentlyWatched, getUserList } from '../controllers/movieListController.js';

const router = Router();
//get user's movies
router.get('/:user_id', authenticateToken, getUserList)

//new route for recently played listt
router.get('/recently-watched/:user_id',authenticateToken, getRecentlyWatched)
//route for deleting movie from user's list
router.delete('/:id',deleteMovie)
//add movie to user's list
router.post('/',authenticateToken, addMovieToList)
//add movie to recently watched list
router.post('/recently-watched',authenticateToken, addToRecentlyWatched)

export default router;