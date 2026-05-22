require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const setupRoutes = require('./routes');

const app = express();

// ================= MongoDB =================
mongoose.connect('mongodb://127.0.0.1:27017/uda')
    .then(() => {
        console.log('Kết nối MongoDB thành công!');
    })
    .catch((err) => {
        console.log('Lỗi kết nối MongoDB:', err);
    });

// Middleware log
app.use(
    morgan(':method :url :status - :response-time ms')
);

// Parse cookie
app.use(
    cookieParser(process.env.COOKIES_KEY)
);

// Parse body
app.use(express.json());

app.use(
    express.urlencoded({ extended: true })
);

// Static folder
app.use(
    '/public',
    express.static(path.join(__dirname, 'public'))
);

// View engine
app.set(
    'views',
    path.join(__dirname, 'views')
);

app.set(
    'view engine',
    'ejs'
);

// Routes
setupRoutes(app);

// Export app
module.exports = app;