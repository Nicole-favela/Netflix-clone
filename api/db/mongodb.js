import mongoose from "mongoose"

async function connect(){

    await mongoose.connect(process.env.MONGO_URL);
    console.log("connection successful");

}
export default connect