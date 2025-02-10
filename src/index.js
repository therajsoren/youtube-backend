import dotenv from "dotenv";
import connectDB from './db/index.js';
import app from './app.js'
dotenv.config({
    path: './.env'
});


connectDB()  // async request hai tu promise jaroor return karega is liye then use kr rhe hai
.then(() => {
    app.listen(process.env.PORT || 3000, () =>{
        console.log(`Server is listening on ${process.env.PORT}`);
        app.on('error',()=>{
            console.error('Server is not running');
            // process.exit(1);  // kill the process with a non-zero status code, indicating an error.
        })
    })
})
.catch((error) => {
    console.error('MongoDB  connection  failed: ' + error);
    // throw error;
});

/*
// iife ----> self-executing anonymous function  https://developer.mozilla.org/en-US/docs/Glossary/IIFE
// https://attacomsian.com/blog/mongoose-connect-async-await
( async() => {
    try {
        // attemt to connect to MongoDB database using mongoose
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // set up error listener for the app 
        app.on('error', (err) =>{
            console.log('ERR: ', error); // log any errors that occur.
            throw error; // 
        })
        // start the server and listen on the specified port
        app.listen(process.env.PORT, () =>{
            console.log(`Server is listening on ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("ERROR", error);
        throw error;
    }
}) ()

*/