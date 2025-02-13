const express = require('express');
const connectDB = require('./config');
const cors = require('cors');
const apiRoutes = require('./routes/api');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));