import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useCart } from '../CartProvider';

function Search(params) {
    const [allProducts, setAllProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState(null);
    const [searchLoading, setSearchLoading] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    const { addToCart } = useCart();

    useEffect(() => {
        const HandleSearch = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/`);
                console.log(response.data);
                setAllProducts(response.data);
                setSearchLoading(false);

            } catch (error) {
                console.log(error);
                setSearchError(error.message);
                setSearchResults([]);
                setSearchLoading(false);
            }
        }
        HandleSearch();
    }, []);

    useEffect(() => {
        if (query && allProducts.length > 0) {
            const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
            setSearchResults(filteredProducts);
        }
    }, [query, allProducts]);

    const handleViewDetails = (id) => {
        window.location.href = `/product/${id}`
    }
    console.log(searchResults);
    return (
        <>
            <div className="container pt-5">
                <div class="row">
                    <h1 class="text-center">Search results for: {query}</h1>
                </div>
                {searchLoading && <h2 className="text-center">Loading...</h2>}
                {searchError && <h3 className="text-center">Something went wrong</h3>}
                {!searchLoading && !searchError && searchResults.length === 0 &&
                    (
                        <div className="bg-light mt-5">
                            <h3 className="text-center">No Result found for {query}</h3>
                        </div>
                    )
                }
                {!searchLoading &&
                    <div className="container">
                        <div className="row">
                            {searchResults.map((result) => {
                                return (
                                    <>
                                        <div class="col mt-5 ">
                                            <div key={result.id} className="card h-100" style={{ width: "400px" }}>
                                                <img class="card-img-top card-img" style={{ height: "500px" }} src={result.image} alt={result.image} />
                                                <div className="card-body d-flex flex-column">
                                                    <h4 className="card-title">
                                                        {result.title}
                                                    </h4>
                                                    <p className="card-text">
                                                        {result.description.substr(0, 100)}
                                                    </p>
                                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                                        <span className="text-2xl font-semibold text-blue-600 mb-2">
                                                            <strong>${result.price.toFixed(2)}</strong>
                                                        </span>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="btn btn-outline-dark" onClick={() => addToCart(result)}>Add to Cart</button>
                                                        <button className="btn btn-dark" onClick={() => handleViewDetails(result.id)}>View Details</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Search;