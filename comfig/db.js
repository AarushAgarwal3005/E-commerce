import mongoose from 'mongoose';
import colors from 'colors'
const connectDB=async()=>{
    try{

        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongodb is connected ${conn.connection.host}`.bgMagenta);
    }
    catch(error){
        console.log(`error in mongodb ${error}`.bgRed.white);

    }
}
export default connectDB
