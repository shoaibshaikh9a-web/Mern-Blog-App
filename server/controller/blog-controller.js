const mongoose= require('mongoose')
const Blog= require('../model/Blog')

//fetch lsit of blogs
//add new blog
//delete blog
//update blog

const fetchListOfBlogs= async(req,res)=>{
    let blogList;
    try{
        blogList= await Blog.find()
    }catch(e){
        console.log(e);
    }

    if(!blogList){
        return res.status(404).json({message:'No Blogs Found'})
    }

    return res.status(200).json({blogList})
};

 const addNewBlog = async(req,res)=>{
    const {title, description} = req.body;
    const currentDate = new Date();

    const newlyCreateBlog= new Blog({
        title, description, date : currentDate
    })

    try{
        await newlyCreateBlog.save()
        //updated code:
        return res.status(200).json({
            newlyCreateBlog
        });
    }catch(e){
        console.log(e);
        //updated code:
        return res.status(500).json({
            message: e.message
        });
    }
/*
    try{
        const session= await mongoose.startSession();
        session.startTransaction();
        await newlyCreateBlog.save(session)
        session.commitTransaction()
    }catch(e){
        return res.send(500).json({message:e})
    }

    return res.status(200).json({newlyCreateBlog});
*/
 }

 const deleteABlog= async(req,res)=>{
    const id= req.params.id;

    try{
        const findCurrentBlog= await Blog.findByIdAndDelete(id);
        if(!findCurrentBlog){
            return res.status(404).json({message:'Blog not found'})
        }

        return res.status(200).json({message:'Successfully deleted'});
    }catch(e){
        console.log(e)
        return res.status(500).json({message:'Unable to delete ! Please try again'})
    }
  
}

const updateBlog= async(req,res)=>{
    const id= req.params.id;

    const {title, description}= req.body
    let currentBlogToUpdate

    try{
        currentBlogToUpdate = await Blog.findByIdAndUpdate(id,{
            title,description
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({message:'Something went wrong while upadting ! Please try againg'})
    }

    if(!currentBlogToUpdate){
        return res.status(500).json({message:'Unable to update'})
    }

    return res.status(200).json({currentBlogToUpdate})
}

module.exports= {fetchListOfBlogs, deleteABlog, updateBlog, addNewBlog}