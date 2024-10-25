// src/components/DoctorsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DoctorsList.css';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/doctors/');
                setDoctors(response.data);
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleDoctorSelect = (doctor) => {
        navigate('/book-appointment', { state: { doctor } });
    };

    return (
        <div className="doctors-list-container">
            <h2>Doctors List</h2>
            <div className="doctors-grid">
                {doctors.map((doctor) => (
                    <div key={doctor.id} className="doctor-card" onClick={() => handleDoctorSelect(doctor)}>
                        <img src={`http://127.0.0.1:8000${doctor.photo}`} alt={doctor.name} className="doctor-photo" />
                        <h3>{doctor.name}</h3>
                        <p>Specialty: {doctor.specialty}</p>
                        <p>Experience: {doctor.yearsExperience} years</p>
                        <p>Availability: {doctor.availability}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
