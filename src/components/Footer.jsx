import { Link } from 'react-router-dom';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {

    return (
        <>
            <footer className="bg-dark text-light py-4 mt-auto">
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-3">
                            <h5>About Us</h5>
                            <p>Your one-stop shop for the best products online.</p>
                        </div>
                        <div className="col-md-3">
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/" className="text-light">Home</Link></li>
                                <li><Link to="/cart" className="text-light">Cart</Link></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h5>Follow Us</h5>
                            <div className="social-icons">
                                <a href="http://facebook.com" className='text-light me-3'>
                                    <FontAwesomeIcon icon={faFacebook} size='lg' />
                                </a>
                                <a href="http://instagram.com" className='text-light me-3'>
                                    <FontAwesomeIcon icon={faInstagram} size='lg' />
                                </a>
                                <a href="http://twitter.com" className='text-light me-3'>
                                    <FontAwesomeIcon icon={faTwitter} size='lg' />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <h5>Subscribe</h5>
                            <input type="email" name="email" placeholder='Your Email' className='form-control mb-2'/>
                            <button className='btn btn-primary btn-sm'>Subscribe</button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;