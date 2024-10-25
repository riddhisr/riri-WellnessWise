// src/components/WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Welcome to Healthcare App</h1>
            <button className="button" onClick={() => navigate('/user-signup')}>User Signup</button>
            <button className="button" onClick={() => navigate('/doctor-signup')}>Doctor Signup</button>
            <button className="button" onClick={() => navigate('/login')}>Login</button>
        </div>
    );
};

export default WelcomePage;
