import { useEffect, useState } from 'react';
import { useCart } from '../CartProvider';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const cartItems = cart;
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="container my-5">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8 ">
          {cartItems.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
              <h5 className='mb-4'>Your cart is empty!!</h5>
              <button onClick={() => navigate("/")} className='btn btn-secondary'>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr className='align-middle'>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className='align-middle'>
                        <td>
                          <img className='img-thumbnail me-2' style={{width:"50px", height:"50px",objectFit:"cover"}} src={item.image} alt={item.title} />
                          {item.title}
                        </td>
                        <td>{item.price}</td>
                        <td className='text-center flex-wrap'>
                          <button className='btn m-2 btn-outline-dark btn-sm' onClick={() => (updateQuantity(item.id, item.quantity + 1))}>+</button>
                          {item.quantity}
                          <button className={`btn m-2 btn-outline-dark btn-sm ${item.quantity === 1 ? "disabled" : ''}`} onClick={() => (updateQuantity(item.id, item.quantity - 1))}>-</button>
                        </td>
                        <td>
                          <button className='btn btn-danger btn-sm' onClick={() => (removeFromCart(item.id))}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="col-lg-4 mt-6 lg:mt-0">
          <div className="border rounded p-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 font-bold flex justify-between">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded mt-6 hover:bg-blue-700">
              Proceed to Checkout
            </button>

            <div className="mt-4 text-sm text-gray-500">
              <p>Free shipping on orders over $50</p>
              <p className="mt-2">Need help? Call us at 1-800-123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;