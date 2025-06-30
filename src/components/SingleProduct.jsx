import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from '../CartProvider';
import { useAuth } from '../AuthCont';
import { useNavigate } from "react-router-dom";

function SingleProduct() {
    const { addToCart } = useCart();
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchdata = async () => {
            try {
                const singleProduct = await axios.get(`https://fakestoreapi.com/products/${id}`);
                console.log(singleProduct.data)
                setProduct(singleProduct.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])

    const handleAddtoCart = (product) => {
        isLoggedIn ? addToCart(product) : navigate('/login');
    }
    return (
        <>
            <div className="container my-5">
                <div className="row">
                    {/* Product Images Section */}
                    <div className="col-md-6 mb-4">
                        <div className="border rounded overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="img-fluid"
                            />
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="col-md-6">
                        <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
                        <h5 className="text-3xl font-bold mb-3">{product.category}</h5>
                        <div className="text-2xl font-semibold text-blue-600 mb-4">
                            <strong>${product.price}</strong>
                        </div>
                        <p className="text-gray-600 mb-4">
                            {product.description}
                        </p>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Quantity:
                            </label>
                            <div className="flex items-center gap-3">
                                {/* <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                    max={product.stock}
                                    className="w-20 p-2 border rounded"
                                /> */}
                                <span className="text-sm text-gray-500">
                                    <p>Rating: {product.rating?.rate} ⭐ ({product.rating?.count} reviews)</p>
                                </span>
                            </div>
                        </div>

                        <div className="d-flex">
                            <button className="btn btn-secondary rounded me-2" onClick={() => handleAddtoCart(product)}>
                                Add to Cart
                            </button>
                            <button className="btn btn-outline-secondary rounded me-2">
                                Add to Wishlist
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-6">
                            <div className="border-t pt-4">
                                <h3 className="text-lg font-semibold mb-2">Shipping</h3>
                                <p className="text-gray-600">
                                    Free shipping on orders over $50. Estimated delivery: 3-5 business days
                                </p>
                            </div>
                            <div className="border-t pt-4 mt-4">
                                <h3 className="text-lg font-semibold mb-2">Returns</h3>
                                <p className="text-gray-600">
                                    Easy 30-day returns. Return shipping is free.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct;