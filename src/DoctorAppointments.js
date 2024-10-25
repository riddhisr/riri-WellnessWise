// src/components/DoctorAppointments.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorAppointments.css';

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/appointments/');
                setAppointments(response.data);
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <div className="appointments-container">
            <h2>Your Appointments</h2>
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Doctor Id</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>User Id</th>
                        <th>description</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.user}</td>
                            <td>{appointment.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorAppointments;
