import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from '../CartProvider';

function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Axios Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleSingleProduct = (productId) => {
    navigate(`/product/${productId}`);
  }
  return (
    <>
      <div className="container my-4">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-center mb-4">Our Products</h2>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <div key={product.id} className="col">
              <div className="card shadow-sm" style={{ minHeight: '450px' }}>
                {/* Product Image - Fixed Height */}
                <div>
                  <img
                    src={product.image}
                    className="img-fluid card-img rounded mx-auto d-block"
                    alt={product.title}
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  {/* Product Details */}
                  <h5 className="card-title mb-2">{product.title}</h5>

                  {/* Description with limited height */}
                  <p className="card-text text-muted mb-3" style={{
                    height: '50px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {product.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    {/* Price */}
                    <span className="text-2xl font-semibold text-blue-600 mb-2">
                      <strong>${product.price.toFixed(2)}</strong>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button className="btn btn-dark" onClick={() => { handleSingleProduct(product.id) }}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
