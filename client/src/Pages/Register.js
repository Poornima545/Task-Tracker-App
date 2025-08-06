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
            <main className="d-flex justify-content-center align-items-center vh-100">
                <article className="card shadow p-5" style={{ width: '500px' }}>
                    <header className="mb-2 text-uppercase">
                        <h1 className="text-center mb-4">Register</h1>
                    </header>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className='form-control'
                                placeholder="userName"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input type="email"
                                placeholder="Email"
                                className='form-control'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className='form-control'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input type="password"
                                placeholder="Password"
                                className='form-control'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className='form-control'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className='btn btn-outline-success w-100 text-uppercase'>Register</button>
                        <p className="mt-3 text-center">
                            Already a member? <Link to="/Login">Login</Link>
                        </p>
                    </form>
                </article>
            </main>
        </>

    );
};

export default Register;
