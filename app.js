const pg        = require('pg');
const express   = require('express');
const app       = express();
const PORT = process.env.PORT;

const config = {
    host:'ec2-54-235-66-81.compute-1.amazonaws.com',
    user: 'yaqralrajdjqyz',
    database: 'd3d5jccv5mvkm1',
    password: 'ee05bdd77d2a0f664c504fba57e77fee496731670abbfe1f8bf87aff5e08a2f7',
    port: 5432,
    ssl: true
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.listen(PORT || 4000, function () {
    var port
    if(!PORT) port=4000;
    else port = PORT
    console.log('Server is running.. on Port '+port);
});
