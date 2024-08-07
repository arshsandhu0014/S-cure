const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentID: {
        type: String,
        required: true
    },
    selectedDate: {
        type: Date,
        required: true
    },
    selectedTime: {
        type: String,
        required: true
    },
    selectedDoctor: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
