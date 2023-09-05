import mongoose from 'mongoose'
const {Schema} =mongoose;

const movielistSchema = new Schema({
    rating: {type: Boolean},
    id: {type: Number},
    title: {type: String, unique: true},
    overview: String,
    user_id: mongoose.Types.ObjectId, //added to associate user with their transactions
   
    release_date: {type: Date},
    poster: String,
    createdAt: {type: Date, default: Date.now},

})
export default new mongoose.model('Movies', movielistSchema)