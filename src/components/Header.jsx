import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../AuthCont";

function Header({ lightMode, darkMode }) {
    const { isLoggedIn, logout } = useAuth();

    const Location = useLocation();
    const queryParams = new URLSearchParams(Location.search);

    const navigate = useNavigate();
    const [cartCount] = useState(0);
    const [query, setQuery] = useState('');
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (queryParams) {
            const q = queryParams.get('q');
            setQuery(q);
        }
    }, [Location.search]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${query}`);
    }

    const handleToggle = (e) => {
        if (isDark) {
            lightMode();
        } else {
            darkMode();
        }
        setIsDark(!isDark);
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
                <div className="container">
                    {/* Brand/logo */}
                    <Link className="navbar-brand fw-bold fs-4" to="/">
                        Shopkart
                    </Link>

                    {/* Mobile toggle button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar content */}
                    <div className="collapse navbar-collapse" id="navbarContent">
                        {/* Search bar */}
                        <form className="d-flex mx-auto mt-3 mt-lg-0" style={{ maxWidth: '500px' }} onSubmit={handleSearch}>
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search products..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    required
                                />
                                <button className="btn btn-outline-dark" type="submit">
                                    Search
                                </button>
                            </div>
                        </form>

                        {/* Menu items */}
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/categories/electronics">Electronics</Link></li>
                                    <li><Link className="dropdown-item" to="/categories/men%27s%20clothing">Clothing</Link></li>
                                    <li><Link className="dropdown-item" to="/categories/jewelery">Jewelery</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/deals">Deals</Link>
                            </li>
                            {!isLoggedIn && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/account">Account</Link>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                            {isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link position-relative" to="/cart">
                                    <FaShoppingCart size={24} />
                                    {cartCount > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </li>
                            )}
                            <li className="nav-item">
                                <div className="form-check form-switch">
                                    <button className={`btn btn-lg ${isDark ? 'btn-dark' : 'btn-light'} rounded-pill px-4`} onClick={handleToggle}>
                                        {isDark ? "🌙 Dark" : "☀️ Light"}
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;