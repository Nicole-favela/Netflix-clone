import {Router} from 'express'
import Movies from '../models/movielistmodel.js'
import authenticateToken from '../utils/authenticate.js'


const router = Router();

router.get('/:user_id',authenticateToken, async (req, res)=>{ //finds movies and sorts in reverse order
    try{
        
        const movie= await Movies.find({ "user_id": req.params.user_id, on_my_list: true }).sort({createdAt: -1})

        const uniqueMovies = await Movies.distinct('title', {
            _id: { $in: movie.map(m => m._id) }
        });
        const uniqueMovieDetails = uniqueMovies.map(async (title) => {
            const movie = await Movies.findOne({ title ,on_my_list: true});
            return {
                _id: movie._id,
                played: movie.played,
                on_my_list: movie.on_my_list,
                rating: movie.rating,
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                user_id: movie.user_id,
                release_date: movie.release_date,
                poster: movie.poster
            };
        });
        const data = await Promise.all(uniqueMovieDetails);
        //console.log('movie is: ', movie)
        res.json({data})
        //res.json(movie)

    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve movie list data' });

    }
   

})
//new route for recently played listt
router.get('/recently-watched/:user_id',authenticateToken, async (req, res)=>{ //finds movies and sorts in reverse order
    try{
        
        const movie= await Movies.find({ "user_id": req.params.user_id, played: true }).sort({createdAt: -1})
    

        const uniqueMovies = await Movies.distinct('title', {
            _id: { $in: movie.map(m => m._id) }
        });
        const uniqueMovieDetails = uniqueMovies.map(async (title) => {
            const movie = await Movies.findOne({ title });
            return {
                _id: movie._id,
                played: movie.played,
                on_my_list: movie.on_my_list,
                rating: movie.rating,
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                user_id: movie.user_id,
                release_date: movie.release_date,
                poster: movie.poster
            };
        });
        const data = await Promise.all(uniqueMovieDetails);
      
        res.json({data})
        //res.json(movie)

    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve movie list data' });

    }
   

})
router.delete('/:id', async (req, res)=>{ //finds movies and sorts in reverse order
    try{
       
        console.log("the id sent is: ",req.params.id)

        await Movies.findOneAndDelete({_id: req.params.id })
       // console.log('movie is: ', movie)
        res.json({message: "deleted item from list"})

    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to delete movie from list' });

    }
   

})

router.post('/',authenticateToken, async (req,res)=>{
   
   
   
    
    try {
        const { played, on_my_list,rating,id,title,overview,release_date, poster, user_id} = req.body
        console.log('in post req for adding movie to list, on my list  is: ', on_my_list)
        // Check if the movie exists in the database for the user
        const existingMovie = await Movies.findOne({ user_id, title });
    
        if (!existingMovie) {
          console.log('movie IS NOT in db ')
          // If the movie doesn't exist, create a new record
          const newMovie = new Movies({
             played,
            on_my_list: true,
            rating,
            id,
            title,
            overview,
            user_id,
            release_date, 
            poster,
            
          });
    
          await newMovie.save();
          res.status(201).json({ message: 'Added to my list.' });
        } else { //movie already in db, update necessary fields
        console.log('movie is already in db ', existingMovie)
          existingMovie.user_id = user_id;
          existingMovie.played = played;
          existingMovie.on_my_list = true;
          existingMovie.rating = rating;
    
          await existingMovie.save();
          res.status(200).json({ message: 'Movie updated.' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'My-list route: failed to add/update movie.' });
      }
   
});
router.post('/recently-watched',authenticateToken, async (req,res)=>{
   
    const { played, on_my_list,rating,id,title,overview,release_date, poster, user_id} = req.body
   
    try {
        // Check if the movie exists in the database for the user
        const existingMovie = await Movies.findOne({ user_id, title });
       
    
        if (!existingMovie) {
          
          const newMovie = new Movies({
            played,
            on_my_list,
            rating,
            id,
            title,
            overview,
            user_id,
            release_date, 
            poster,
          });
    
          await newMovie.save();
          res.status(201).json({ message: 'Movie marked as recently watched.' });
        } else {
       
          existingMovie.played = true;
          existingMovie.on_my_list = on_my_list;
          existingMovie.rating = rating;
    
          await existingMovie.save();
          res.status(200).json({ message: 'Movie updated as recently watched.' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add/update movie as recently watched.' });
      }
  
});
export default router;