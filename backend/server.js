const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware'); // Import authMiddleware
const { register, login } = require('./controllers/authController'); // Import authController

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/appointments';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const appointmentsRouter = require('./routes/appointmentRoutes');
const doctorsRouter = require('./routes/Doctor');

// Mount authentication routes
app.post('/register', register);
app.post('/login', login);

// Protected routes
app.use('/appointments', appointmentsRouter); // Require 'user' role for accessing appointments
app.use('/doctors',  doctorsRouter); // Require 'admin' role for accessing doctors

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
