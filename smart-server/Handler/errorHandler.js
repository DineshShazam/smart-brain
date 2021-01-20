const errorHandler = (func) => async (req,res,next) => {
    return Promise.resolve(func(req,res,next)).catch((err) => {
        if(err) {
            res.status(500).send('Execution error');
        } else {
            res.status(500).send('Internal Server Error');
        }
    })
}

module.exports = errorHandler;