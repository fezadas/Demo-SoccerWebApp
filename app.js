const PORT = process.env.PORT;

const app = require('./server/router/route.js')
const server = app()


server.listen(PORT || 4000, function () {
    var port
    if(!PORT) port=4000;
    else port = PORT
    console.log('Server is running.. on Port '+port);
});
