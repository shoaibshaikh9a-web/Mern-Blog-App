import { useContext } from "react"
import { GlobalContext } from "../../context"
import axios from 'axios'
import { useEffect } from "react"
import classes from './styles.module.css'
import {FaTrash, FaEdit} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'


export default function Home(){

    const {blogList,setBlogList,pending,setPending} = useContext(GlobalContext)
    const navigate= useNavigate();

    async function fetchListOfBlogs() {
        setPending(true)
        const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`)
        const result= await response.data;

        console.log(result)
        if(result && result.blogList){
            setBlogList(result.blogList)
            setPending(false)
        }else{
            setPending(false)
        }

    };
    async function handleDeleteBlog(getCurrentId) {
        console.log(getCurrentId)
        const response= await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/delete/${getCurrentId}`)
        const result= await response.data;

        console.log(result)
        if(result?.message){
            fetchListOfBlogs();
        }
    };
    function handleEdit(getCurrentBlogItem){
        console.log(getCurrentBlogItem);
        navigate('/add-blog',{state:{getCurrentBlogItem}})
    }

    useEffect(()=>{
        fetchListOfBlogs()
    },[])
    return(
        <div  className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Blog List</h1>
            {
                pending ? <h1 className="text-lg font-medium text-gray-600">Loading Blogs ! Please wait</h1> 
                : <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            blogList && blogList.length ? blogList.map((blogItem)=>
                            <div key={blogItem._id}
                                //className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
                                className="bg-linear-to-br from-white to-blue-50 border border-blue-200 rounded-xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <p //className="text-xl font-semibold text-gray-800 mb-2"
                                    className="text-xl font-bold text-blue-700 mb-2"
                                >
                                    {blogItem.title}
                                </p>
                                <p //className="text-gray-600 mb-4"
                                    className="flex gap-4 pt-2 border-t border-blue-100"
                                >
                                    {blogItem.description}
                                </p>
                                <div className="flex gap-4">
                                    <FaEdit className="text-blue-600 cursor-pointer hover:text-blue-800" onClick={()=>handleEdit(blogItem)} size={20}/>
                                    <FaTrash className="text-red-600 cursor-pointer hover:text-red-800" onClick={()=>handleDeleteBlog(blogItem._id)} size={20}/>
                                </div>
                            </div>
                            ) : <h3  className="text-gray-500 text-lg">No Blogs Added</h3>
                        }
                </div>
            }
        </div>
    )
}