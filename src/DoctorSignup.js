// src/DoctorSignup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorSignup.css';

const DoctorSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        specialty: '',
        yearsExperience: '',
        availability: '',
        password: '',
        rating: '',
    });
    const [photo, setPhoto] = useState(null); // State for the doctor's photo
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]); // Set the photo file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear previous error message
    
        const signupFormData = new FormData();
        signupFormData.append('name', formData.name);
        signupFormData.append('email', formData.email);
        signupFormData.append('specialty', formData.specialty);
        signupFormData.append('yearsExperience', formData.yearsExperience);
        signupFormData.append('availability', formData.availability);
        signupFormData.append('password', formData.password);
        signupFormData.append('rating', formData.rating);
        if (photo) {
            signupFormData.append('photo', photo);  // Add photo file if available
        }
    
        console.log([...signupFormData]); // Log form data to verify it's being sent correctly
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/doctors/', {
                method: 'POST',
                body: signupFormData,
                headers: {
                    'Accept': 'application/json',
                }
            });
    
            const result = await response.json();
    
            if (response.ok) {
                // Signup successful, redirect to login page
                navigate('/login');
            } else {
                console.error('Signup error:', result);
                setError(result.detail || 'Signup failed. Please try again.');
            }
        } catch (err) {
            console.error('Error during signup:', err);
            setError('Signup failed. Please try again.');
        }
    };
    
    

    return (
        <div className="signup-container">
            <h2>Doctor Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="specialty" placeholder="Specialty" value={formData.specialty} onChange={handleChange} required />
                <input type="number" name="yearsExperience" placeholder="Years of Experience" value={formData.yearsExperience} onChange={handleChange} required />
                <input type="text" name="availability" placeholder="Availability" value={formData.availability} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} required />
                
                {/* File input for photo */}
                <input type="file" name="photo" onChange={handleFileChange} required />
                
                <button type="submit">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default DoctorSignup;
