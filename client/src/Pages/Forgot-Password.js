import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="reset">Reset Password</button>
                <p>Back to <Link to="/login">Login?</Link>
                </p>
            </form>
        </div>
    );
}

export default ForgotPassword;
