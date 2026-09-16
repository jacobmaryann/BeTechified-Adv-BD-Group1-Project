const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    console.error(err.stack)
    res.status(500).json({error: err.message})
    next()

};

module.exports = errorHandler