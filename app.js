const pg        = require('pg');
const express   = require('express');
const app       = express();

const config = {
    user: 'fezadas',
    database: 'soccerdb',
    password: 'mypass',
    port: 5433
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
