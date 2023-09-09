import {Router} from 'express'
import Movies from '../models/movielistmodel.js'
const router = Router();

router.get('/:user_id', async (req, res)=>{ //finds movies and sorts in reverse order
    try{
        
        const movie= await Movies.find({ "user_id": req.params.user_id }).sort({createdAt: -1})

        const uniqueMovies = await Movies.distinct('title', {
            _id: { $in: movie.map(m => m._id) }
        });
        const uniqueMovieDetails = uniqueMovies.map(async (title) => {
            const movie = await Movies.findOne({ title });
            return {
                _id: movie._id,
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
        console.log('movie is: ', movie)
        res.json({data})

    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve movie list data' });

    }
   

})
router.delete('/:id', async (req, res)=>{ //finds movies and sorts in reverse order
    try{
        //const {_id: _id} = req.params
        console.log("the id sent is: ",req.params.id)
        // if (!mongoose.Types.ObjectId.isValid(_id)) 
        //     return res.status(404).json({ msg: `No movie with id :${_id}` 
        // });
        await Movies.findOneAndDelete({_id: req.params.id })
       // console.log('movie is: ', movie)
        res.json({message: "deleted item from list"})

    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to delete movie from list' });

    }
   

})

router.post('/', async (req,res)=>{
   
    const {rating,id,title,overview,release_date, poster, user_id} = req.body
   
    console.log('the data is rating: ', rating, ', title: ', title, 'overview: ', overview, ' , releasedate: ', release_date, ' and user id: ', user_id)
     
    const movie= new Movies({
        rating,
        id,
        title,
        overview,
        user_id,
        release_date, 
        poster,
        
        
    });
    await movie.save()
    res.json( {message: "successfully saved a movie to your list!"})
});
export default router;