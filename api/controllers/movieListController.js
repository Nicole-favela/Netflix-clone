import * as dotenv from 'dotenv'
import Movies from '../models/movielistmodel.js'


dotenv.config()


export const getUserList = async (req, res) => {
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
       

    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve movie list data' });

    }
   
  };
export const getRecentlyWatched = async (req, res)=>{
    try{
        const movie= await Movies.find({ "user_id": req.params.user_id, played: true }).sort({createdAt: -1})
       
    
        const uniqueMovies = await Movies.distinct('title', {
            _id: { $in: movie.map(m => m._id) }
        });
        const uniqueMovieDetails = uniqueMovies.map(async (title) => {
            const movie = await Movies.findOne({ title});
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
   
}
export const deleteMovie= async (req, res)=>{
    try{
        await Movies.findOneAndDelete({_id: req.params.id })
       
        res.json({message: "deleted item from list"})

    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to delete movie from list' });

    }

}
export const addMovieToList= async (req, res)=>{
    try {
        const { played, on_my_list,rating,id,title,overview,release_date, poster, user_id} = req.body
       
        // Check if the movie exists in the database for the user
        const existingMovie = await Movies.findOne({ user_id, title });
    
        if (!existingMovie) {
        
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
          return res.status(201).json({ message: 'Added to my list.' });
        } else { //movie already in db, update necessary fields
       
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

}
export const addToRecentlyWatched= async (req, res)=>{
    
   
    try {
        // Check if the movie exists in the database for the user
        const { played, on_my_list,rating,id,title,overview,release_date, poster, user_id} = req.body
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
         
          existingMovie.rating = rating;
          if (on_my_list) {
            existingMovie.on_my_list = on_my_list;
          }
          await existingMovie.save();
          res.status(200).json({ message: 'Movie updated as recently watched.' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add/update movie as recently watched.' });
      }

}