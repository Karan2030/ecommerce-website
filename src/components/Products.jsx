import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from '../CartProvider';
import { useAuth } from '../AuthCont';


function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

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

  const handleSort = (value) => {
    let sortedProducts = [...products];
    if (value === 'price_asc') {
      sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });
      setProducts(sortedProducts);
    } else if (value === 'price_desc') {
      sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });
      setProducts(sortedProducts);
    } else if (value === 'name_asc') {
      sortedProducts.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
      setProducts(sortedProducts);
    } else if (value === 'name_desc') {
      sortedProducts.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });
      setProducts(sortedProducts);

    }
  }
  const handleSingleProduct = (productId) => {
    navigate(`/product/${productId}`);
  }

  const handleAddToCart = (product) => {
    isLoggedIn ? addToCart(product) : navigate('/login');
  }
  return (
    <>
      <div className="container my-4">
        <div className="row mb-4">
          <div className="d-flex justify-content-end align-items-center">
            <span className="">Sort by : </span>
            <select name="sort" id="sort" className="form-select w-auto ms-2" onChange={(e) => handleSort(e.target.value)}>
              <option value="" disabled selected>Select</option>
              <option value="price_asc">Price(Low to High)</option>
              <option value="price_desc">Price(High to Low)</option>
              <option value="name_asc">Name(A-Z)</option>
              <option value="name_desc">Name(Z-A)</option>
            </select>
          </div>
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
                      onClick={() => handleAddToCart(product)}
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
