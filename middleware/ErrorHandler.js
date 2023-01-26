module.exports = (err, next) => {
    // if the error has a statusCode property, we are sure it's an error that we have thrown ourselves
    if (err.statusCode) {
        next(err);
    } else {
        // otherwise, it's an unhandled error, so we'll just log it to the console
        console.error(err);
        next(err);
    }
};
