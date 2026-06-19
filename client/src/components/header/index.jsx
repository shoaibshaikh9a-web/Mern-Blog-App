import { Link } from 'react-router-dom'
import classes from './styles.module.css'


export default function Header(){

    return(
        <div className="p-5 flex flex-row items-center bg-blue-600 text-white shadow-md">
            <h3 className='flex-1 font-extrabold text-3xl md:text-4xl'>Mern Blog App</h3>
            <ul className='flex gap-6 text-lg md:text-xl font-medium'>
                <Link className="hover:text-blue-200 transition-colors duration-200" to={'/'}><li>Home</li></Link>
                <Link className="hover:text-blue-200 transition-colors duration-200" to={'/add-blog'}><li>Add Blog</li></Link>                            
            </ul>
        </div>
    )
}