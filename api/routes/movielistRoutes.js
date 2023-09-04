import {Router} from 'express'
import Movies from '../models/movielistmodel.js'
const router = Router();

router.get('/:user_id', async (req, res)=>{ //finds movies and sorts in reverse order
    try{
        
        const movie= await Movies.find({ "user_id": req.params.user_id }).sort({createdAt: -1})
        console.log('movie is: ', movie)
        res.json({data: movie})

    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve movie list data' });

    }
   

})

router.post('/', async (req,res)=>{
   
    const {rating,title,overview,release_date, poster, user_id} = req.body
   
    console.log('the data is rating: ', rating, ', title: ', title, 'overview: ', overview, ' , releasedate: ', release_date, ' and user id: ', user_id)
     
    const movie= new Movies({
        rating,
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