import { useContext } from 'react'
import classes from './styles.module.css'
import { GlobalContext } from '../../context'
import axios from 'axios'
import {useNavigate, useLocation} from 'react-router-dom'
import { useEffect } from 'react'


export default function AddNewBlog(){

    const {formData,setFormData, isEdit, setIsEdit}= useContext(GlobalContext);
    const navigate=useNavigate()
    const location =useLocation()

    async function handleSaveBlogToDatabase() {
        const response= isEdit ? await axios.put(`${import.meta.env.VITE_API_URL}/api/blogs/update/${location.state.getCurrentBlogItem._id}`,{
            title:formData.title,
            description: formData.description
        })
        : await axios.post(`${import.meta.env.VITE_API_URL}/api/blogs/add`,{
            title:formData.title,
            description:formData.description
        })

        const result= await response.data;

        console.log(result);
        if(result){
            setIsEdit(false)
            setFormData({
                title:'',
                description:''
            })
            navigate("/");
        }
    }

    console.log(formData);
    useEffect(()=>{
        console.log(location)
        if(location.state){
            const {getCurrentBlogItem}=location.state;
            setIsEdit(true);
            setFormData({
                title:getCurrentBlogItem.title,
                description:getCurrentBlogItem.description
            })
        }
    },[location])
    return(
        <div className="max-w-2xl mx-auto p-4 sm:p-6"
        >
            <h1  className="text-2xl sm:text-3xl font-bold mb-6" >{isEdit?'Edit a Blog':"Add a Blog"}</h1>
            <div  className="flex flex-col gap-4">
                <input type="text" 
                    className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder='Enter Blog Title'
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={(e)=>setFormData({...formData,title:e.target.value})}
                />
                <textarea name="description" 
                    className="w-full border border-gray-300 rounded-lg p-3 min-h-40 outline-none focus:ring-2 focus:ring-blue-500"
                    id="description"
                    placeholder='Enter Blog Description'
                    value={formData.description}
                    onChange={(e)=>setFormData({...formData,description:e.target.value})}
                />
                <button onClick={handleSaveBlogToDatabase}
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
                >
                    {isEdit?'Edit Blog':"Add Blog"}
                </button>
            </div>
        </div>
    )
}