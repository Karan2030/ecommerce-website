import { useState } from "react";
import axios from "axios";

const registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/auth/register', {
                email,
                password
            });
            if (res.status == 201) {
                alert('Registration Successful');
                window.location.href = '/login';
            }
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    }
    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-sm-6">
                    <h1>Registration</h1>
                    <p>Please fill out the form to register.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default registration;