const app = require('./app');
const port = 4041

// Stop process killing on exceptions
process.on('uncaughtException', function(err) {
    console.log('UncaughtException : %s', err.stack ? err.stack : err);
});

app.listen(port,() => {
    console.log(`Application started in port ${port}`);
});