const pg        = require('pg');
const express   = require('express');
const app       = express();

const config = {
    user: 'yaqralrajdjqyz',
    database: 'yaqralrajdjqyz',
    password: 'ee05bdd77d2a0f664c504fba57e77fee496731670abbfe1f8bf87aff5e08a2f7',
    port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT * FROM "Player"', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
       })
   })
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});
