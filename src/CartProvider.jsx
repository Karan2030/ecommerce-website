import { createContext, useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify'
import "react-toastify/ReactToastify.css"

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 0) + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        toast.success(`${product.title} is added to cart!`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }

    const removeFromCart = (id) => {
        setCart((prevCart) => {
            return prevCart.filter((item) => item.id !== id);
        });
    }

    const updateQuantity = (id, quantity) => {
        setCart((prevCart) => {
            return (prevCart.map((item) => {
                return (
                    item.id === id ? { ...item, quantity: quantity } : item
                )
            }))
        })
    }

    const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
export const useCart = () => useContext(CartContext);