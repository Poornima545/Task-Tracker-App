import React, { useState } from 'react';
import { register } from '../Api/Api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Password do not match")
            return
        }
        try {
            await register({ userName, email, phone, password });
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            alert(err.response.data.error);
        }
    };

    return (
        <>
            <header><h2>Register</h2></header>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
                <p className="login-link">
                    Already a member? <Link to="/Login">Login</Link>
                </p>
            </form>
        </>

    );
};

export default Register;
