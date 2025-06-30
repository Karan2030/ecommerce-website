import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import SearchPage from './components/SearchPage';
import Categories from './components/Categories';
import Login from './components/Login';
import Registration from './components/Registration';
import Account from './components/Account';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useColorify } from './colorify';
import { useAuth } from './AuthCont';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { isLoggedIn, logout } = useAuth();
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
      <div className='app min-vh-100 d-flex flex-column' style={{backgroundColor : state.background, color : state.foreground}}>
        <Header lightMode={lightMode} darkMode={darkMode} />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/categories/:category' element={<Categories />} />
          { !isLoggedIn && <Route path='/login' element={<Login />} /> }
          { isLoggedIn && <Route path='/account' element={<Account/>}/> }
          <Route path='/register' element={<Registration />} />
          <Route path='/account' element={<PrivateRoute><Account/></PrivateRoute>} />
        </Routes>
        <ToastContainer />
        <Footer/>
      </div>
    </>
  )
}

export default App
