import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'

const connectDB =  async () => { // time lagta hai is liye asyn use kreke 
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !!`);
        // console.log(`\n MongoDB connected !! DB HoST: ${db.connection.host}`);
    } catch (error) {
        console.log('Mongo db failed to connect', error);
    }
}

export default connectDB;