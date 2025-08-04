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
            <header>
                <h1>Login</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  // 🔥 Add this handler
                        required
                    />
                    <br />
                    <p className="forgot-password">
                        <Link to='/forgot-password'>Forgot Password</Link>
                    </p>
                    <button type="submit">Login</button>
                    <p className="register-link">
                        Not a member yet? <Link to="/register">Register</Link>
                    </p>
                </form>
            </main>
        </>
    );
}

export default Login;
