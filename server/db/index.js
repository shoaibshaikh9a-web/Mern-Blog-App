const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect('mongodb://shoaibshaikhUser:ShoaibShaikh123@ac-vqx3cmx-shard-00-00.gwj02wu.mongodb.net:27017,ac-vqx3cmx-shard-00-01.gwj02wu.mongodb.net:27017,ac-vqx3cmx-shard-00-02.gwj02wu.mongodb.net:27017/?ssl=true&replicaSet=atlas-27ggn0-shard-0&authSource=admin&appName=Cluster0'

).then(() => console.log('connected to mongodb'))
.catch((e)=>console.log(e));