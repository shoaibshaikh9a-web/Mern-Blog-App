const express= require('express');
const cors= require('cors');
const blogRouter= require('./route/blog-route')
require('./db');
const PORT = process.env.PORT || 5000

const app= express()
app.use(cors())
app.use(express.json())

app.use('/api/blogs',blogRouter)

app.use("/api",(req,res)=>{
    res.send("hello World");
})

app.listen(PORT,()=>console.log('App is running at 5000...'))