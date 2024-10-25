// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import UserSignup from './UserSignup';
import DoctorSignup from './DoctorSignup';
import Login from './Login';
import DoctorsList from './DoctorsList';
import Confirmation from './Confirmation';
import DoctorAppointments from './DoctorAppointments';
import BookAppointment from './BookAppointment';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/user-signup" element={<UserSignup />} />
            <Route path="/doctor-signup" element={<DoctorSignup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctors-list" element={<DoctorsList />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
        </Routes>
    );
};

export default App;
