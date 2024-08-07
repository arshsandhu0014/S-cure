import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AppointmentScheduler from './components/AppointmentScheduler';
import AppointmentList from './components/AppointmentList';
import AddDoctorForm from './components/AddDoctorForm';

function App() {
  const [user, setUser] = useState(null);

  // Function to handle user login
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appointment-scheduler" element={<AppointmentScheduler />} />
          <Route path="/appointment-list" element={<AppointmentList />} />
          <Route path="/add-doctor" element={<AddDoctorForm />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
