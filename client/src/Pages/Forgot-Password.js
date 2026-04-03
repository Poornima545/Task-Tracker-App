import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../Api/Api';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await forgotPassword(email);
            alert(res.data.message);
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.error || 'Something Went Wrong');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Forgot Password</h2>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">Reset Password</button>
                        <p className="text-center">
                            Back to <Link to="/login">Login?</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
