import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Api/Api";

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending Login Request:", { email, password });
            const res = await login({ email, password });
            console.log("Response from Backend:", res);
            if (res && res.data && res.data.token) {
                onLogin(res.data.token);
                navigate("/dashboard");
            } else {
                alert("Login failed. Please try again.");
            }
        } catch (err) {
            // console.error("Login Error:", err);
            alert(err.response?.data?.error || 'Login Failed.');
        }
    };

    return (
        <>
            <main className="d-flex justify-content-center align-items-center vh-100">
                <article className="card shadow p-5" style={{ width: '500px' }}>

                    <header className="mb-2 text-uppercase">
                        <h1 className="text-center mb-4">Login</h1>
                    </header>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <input
                                type="email"
                                className="email form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="password"
                                className="password form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}  
                                required
                            />
                        </div>
                        {/* <br /> */}
                        <div className="mb-3 text-end">
                            <Link to='/forgot-password' className="small">Forgot Password?</Link>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 text-uppercase">Login</button>
                        <p className="mt-3 text-center">
                            Not a member yet? <Link to="/register">Register</Link>
                        </p>
                    </form>
                </article>
            </main>
        </>
    );
}

export default Login;
