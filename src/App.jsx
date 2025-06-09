import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import SearchPage from './components/SearchPage';
import Categories from './components/Categories';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
  
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useColorify } from './colorify';

function App() {
  const theme = useColorify();

  const [state, setState] = useState(theme.light);

  const lightMode = () => {
    setState(theme.light)
  }

  const darkMode = () => {
    setState(theme.dark)
  }
  return (
    <>
      <div className='app min-vh-100' style={{backgroundColor : state.background, color : state.foreground}}>
        <Header lightMode={lightMode} darkMode={darkMode} />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/categories/:category' element={<Categories />} />
        </Routes>
        <ToastContainer />
        <Footer/>
      </div>
    </>
  )
}

export default App
