import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentsList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/appointments')
            .then(response => {
                setAppointments(response.data);
            })
            .catch(error => {
                console.error('Error fetching appointments:', error.message);
            });
    }, []); 

    return (
        <div className="container">
            <h2 className="my-4">Appointments</h2>
            <div className="row">
                {appointments.map(appointment => (
                    <div key={appointment._id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Appointment</h5>
                                <p className="card-text">Date: {appointment.selectedDate}</p>
                                <p className="card-text">Time: {appointment.selectedTime}</p>
                                <p className="card-text">Student Name: {appointment.studentName}</p>
                                <p className="card-text">Student ID: {appointment.studentID}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppointmentsList;
