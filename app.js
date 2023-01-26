const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const jwt = require('./middleware/jwt');
const validation = require('./middleware/validation');
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');
const mongo = require('./services/mongo');

dotenv.config(); // load environment variables from .env file

const app = express();

app.use(bodyParser.json()); // parse incoming request bodies in JSON format
app.use(bodyParser.urlencoded({ extended: true })); // parse incoming request bodies in URL-encoded format
app.use(errorHandler); // use error handler middleware
app.use(jwt); // use jwt middleware
app.use(validation); // use validation middleware
app.use('/admin', adminRoutes); // use admin routes
app.use('/customer', customerRoutes); // use customer routes

mongo.connect(); // connect to MongoDB database

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`);
});
