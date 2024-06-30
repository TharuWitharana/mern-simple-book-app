import express from "express"
import {PORT,mongoDBURL} from "./config.js";
import bookRoute from './routes/booksRoute.js'
import mongoose from 'mongoose';
import cors from 'cors';

const app = express()

//midlewares for parsing req body
app.use(express.json());

//middleware for handling CORS POLICY

//Option 1- Allow default all origins *
app.use(cors());

//// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

//HTTP Routes
app.get('/', function (req, res) {
  res.status(234).send('Hello World')
})

app.use('/books', bookRoute)

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App is connected to the database');
        app.listen(PORT,()=>{
            console.log(`app is listning to port: ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })