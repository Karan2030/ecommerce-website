import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../CartProvider';

function Categories() {
    const [products, setProducts] = useState([]);
    const addToCart = useCart();
    const navigate = useNavigate();
    const { category } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [category]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center mb-4 mt-4 text-uppercase">{category}</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {
                            products.map((product) => {
                                return (
                                    <div className="col-md-4 mb-5">
                                        <div className="card">
                                            <img className='img-fluid card-img rounded mx-auto d-block' src={product.image} alt={product.title} />
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{product.title}</h5>
                                                <p className='card-text'>{product.description.substr(0, 100)}</p>
                                                <div className='mt-auto'>
                                                    <h5>${product.price}</h5>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="btn btn-outline-dark" onClick={() => addToCart(product)}>Add to Cart</button>
                                                        <button className="btn btn-dark" onClick={() => {
                                                            navigate(`/product/${product.id}`)
                                                        }}>View Details</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories;