const cors=require('cors')
const express=require('express')
const app=express();
const mongoose=require('mongoose');
const port=8000;
const path = require('path');
const router=require('./Route/myRouter');
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use('/subjects', express.static(path.join(__dirname, 'subjects')));
app.use('/chapters/thumbnails', express.static(path.join(__dirname,'chapters/thumbnails')));
app.use('/chapters/videos', express.static(path.join(__dirname,'chapters/videos')));
app.use(cors({
    origin: 'https://learning-management-system-front-sable.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
mongoose.connect('mongodb+srv://soumyaranjan65432:kathakhunta90@cluster0.grybuzc.mongodb.net/lms')
.then(()=>{
    console.log('MongoDb Connected Successfully')
}).catch(err=>{
    console.log(err)
})
app.use('/api',router);
app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`)
})
