import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentScheduler = () => {
    const [studentName, setStudentName] = useState('');
    const [studentID, setStudentID] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [doctors, setDoctors] = useState([]);

    // Fetch doctors from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3000/doctors')
            .then(response => {
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error.message);
            });
    }, []);

    const handleNameChange = (e) => {
        setStudentName(e.target.value);
    };

    const handleIDChange = (e) => {
        setStudentID(e.target.value);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleDoctorChange = (e) => {
        setSelectedDoctor(e.target.value);
    };

    const handleScheduleAppointment = () => {
        // Check if required fields are empty
        if (!studentName || !studentID || !selectedDate || !selectedTime || !selectedDoctor) {
            console.error('Please fill out all fields');
            return;
        }
        console.log(selectedDoctor);
        // Send appointment data to backend
        axios.post('http://localhost:3000/appointments', {
            studentName: studentName,
            studentID: studentID,
            selectedDate: selectedDate,
            selectedTime: selectedTime,
            selectedDoctor: selectedDoctor
        })
        .then(response => {
            // Appointment scheduled successfully
            console.log(response.data);
            setMessage(`Appointment scheduled for ${response.data.studentName} with ${response.data.selectedDoctor} on ${response.data.selectedDate} at ${response.data.selectedTime}`);
            setShowModal(true);
        })
        .catch(error => {
            // Error handling
            setMessage('Error scheduling appointment: ' + error.message);
            if (error.response) {
                // Display server response message
                setMessage('Server Response: ' + error.response.data.message);
            }
        });
    };

    return (
        <div className="container w-50 mt-5">
            <h2 className="mb-4 text-primary">Appointment Scheduler</h2>
            <div className="mb-3">
                <label htmlFor="studentName" className="form-label">Student Name:</label>
                <input
                    type="text"
                    id="studentName"
                    className="form-control"
                    value={studentName}
                    onChange={handleNameChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="studentID" className="form-label">Student ID:</label>
                <input
                    type="text"
                    id="studentID"
                    className="form-control"
                    value={studentID}
                    onChange={handleIDChange}
                />
            </div>
            <div className='d-flex  justify-content-around '>

            <div className="mb-3  w-25">
                <label htmlFor="date" className="form-label">Select Date:</label>
                <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>
            <div className="mb-3 w-25">
                <label htmlFor="time" className="form-label">Select Time:</label>
                <input
                    type="time"
                    id="time"
                    className="form-control"
                    value={selectedTime}
                    onChange={handleTimeChange}
                />
            </div>
            </div>
          
            <div className="mb-3">
                <label htmlFor="doctor" className="form-label">Select Doctor:</label>
                <select
                    id="doctor"
                    className="form-control"
                    value={selectedDoctor}
                    onChange={handleDoctorChange}
                >
                    <option value="">Select a doctor</option>
                    {doctors.map(doctor => (
                        <option key={doctor._id} value={doctor.name}>
                            {doctor.name}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary mb-3" onClick={handleScheduleAppointment}>Schedule Appointment</button>

            {/* Modal */}
            {showModal &&
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-primary">Appointment Scheduled</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>{message}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AppointmentScheduler;
