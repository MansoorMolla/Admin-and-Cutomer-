const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // get the token from the headers
    const token = req.headers.authorization;
    if (!token) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }

    // verify the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    // check if the token is valid
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }

    // set the userId on the request object
    req.userId = decodedToken.userId;
    next();
};
