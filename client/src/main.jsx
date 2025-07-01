import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './CartProvider.jsx'
import Colorify from './colorify.jsx'
import { AuthProvider } from './AuthCont.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <Colorify>
            <App />
          </Colorify>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
