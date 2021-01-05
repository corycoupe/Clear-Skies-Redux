const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
app.use(cors());
app.options('*', cors());
// Connect Database //
connectDB();

// middleware here
app.use(express.json({ extended: false }));

// Endpoints
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/medical', require('./routes/api/medical'));
app.use('/api/schedule', require('./routes/api/schedule'));
app.use('/api/pharma', require('./routes/api/pharma'));
app.use('/api/therapist', require('./routes/api/therapist'));

// opening a listening to port 5000 for server
const PORT = 5000;
app.listen(PORT, () => console.log(`app is listening to port ${PORT}`));
