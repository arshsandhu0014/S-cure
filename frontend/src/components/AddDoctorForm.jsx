import React, { useState } from 'react';
import axios from 'axios';

const AddDoctorForm = () => {
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/doctors', {
                name,
                specialization,
                email
            });
            setMessage(`Doctor added successfully with ID: ${response.data._id}`);
        } catch (error) {
            setMessage('Error adding doctor: ' + error.message);
            if (error.response) {
                setMessage('Server Response: ' + error.response.data.message);
            }
        }
    };

    return (
        <div className="container w-50">
            <h2 className="mt-5 mb-4 text-primary">Add Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="specialization">Specialization:</label>
                    <input
                        type="text"
                        id="specialization"
                        className="form-control"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-3">Add Doctor</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default AddDoctorForm;
