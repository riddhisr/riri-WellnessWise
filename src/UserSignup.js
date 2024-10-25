import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSignup.css';

const UserSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        issue: '',
        insurance: '',
        location: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            if (response.ok) {
                navigate('/login');
            } else {
                setError(responseData.detail || 'Signup failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during signup:', err);
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h2>User Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                <input type="text" name="issue" placeholder="Issue" value={formData.issue} onChange={handleChange} required />
                <input type="text" name="insurance" placeholder="Insurance" value={formData.insurance} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default UserSignup;

