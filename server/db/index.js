require('dotenv').config();
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URI

).then(() => console.log('connected to mongodb'))
.catch((e)=>console.log(e));