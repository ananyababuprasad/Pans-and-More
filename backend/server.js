require('dotenv').config()
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const recipeRoutes=require('./routes/recipes')
const userRoutes=require('./routes/user')
const actionRoutes=require('./routes/actions')
const otherRoutes=require('./routes/other')

//express app
const app=express();

//middleware
app.use(express.json());
app.use(cors())
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

//routes
app.use('/api/recipes',recipeRoutes)
app.use('/api/user',userRoutes)
app.use('/api/action',actionRoutes)
app.use('/api/other',otherRoutes)

mongoose.connect(process.env.MONGO_UI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
        console.log('connected to db and listening on port',process.env.PORT)})
    })
    .catch((error)=>{
        console.log(error)
    })
