import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        axios.post('http://127.0.0.1:8000/api/login/', { email: email.trim(), password: password.trim() }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log("Login successful:", response.data);
                setLoading(false);
                
                // Navigate based on role
                if (response.data.role === 'doctor') {
                    navigate('/doctor-appointments'); // Redirect to doctor’s appointment table
                } else if (response.data.role === 'user') {
                    navigate('/doctors-list'); // Redirect to doctors list for users
                }
            })
            .catch((error) => {
                setLoading(false);
                
                // If the server responded with an error
                if (error.response) {
                    console.log("Login failed", error.response.data);
                    
                    // Set the error from server or provide a fallback error message
                    setError(error.response.data.error || "Login failed. Please check your credentials.");
                
                // If the request was made but no response was received
                } else if (error.request) {
                    console.log("No response received", error.request);
                    setError("No response received from the server. Please try again later.");
                
                // Any other error (like a setup error)
                } else {
                    console.log("Error setting up the request", error.message);
                    setError("There was an issue with your login request. Please try again.");
                }
            });            
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="title">Login Page</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
