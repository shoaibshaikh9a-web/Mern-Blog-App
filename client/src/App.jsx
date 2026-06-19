import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './components/header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import AddNewBlog from './pages/add-blog'


function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/add-blog' element={<AddNewBlog/>}/>
        </Routes>
      </div>
  )
}

export default App
