import { Navigate, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/Forgot-Password";
import Dashboard from "./Components/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLogin = (token) => {
    setToken(token)
    localStorage.setItem('token', token)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <div className="App">
      <h1>Task Tracker App with Login</h1>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
         <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;
