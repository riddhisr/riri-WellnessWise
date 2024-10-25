// src/components/BookAppointment.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookAppointment.css';

const BookAppointment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { doctor } = location.state;

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleBooking = (e) => {
        e.preventDefault();
        const appointmentDetails = {
            doctor: doctor.name,
            date,
            time,
        };
        navigate('/confirmation', { state: appointmentDetails });
    };

    return (
        <div className="booking-container">
            <h2>Book Appointment with Dr. {doctor.name}</h2>
            <form onSubmit={handleBooking}>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default BookAppointment;
