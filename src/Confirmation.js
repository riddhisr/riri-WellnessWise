// src/components/Confirmation.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Confirmation.css';

const Confirmation = () => {
    const location = useLocation();
    const { doctor, date, time } = location.state;

    return (
        <div className="confirmation-container">
            <h2>Appointment Confirmed!</h2>
            <p>Doctor: {doctor}</p>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
        </div>
    );
};

export default Confirmation;
