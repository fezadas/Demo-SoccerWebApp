const express = require('express')
const router = express()
router.set('view engine', 'hbs')
router.set('views', './server/views')
const hbs = require('hbs')
hbs.registerPartials('./server/views/partials')

module.exports = router

const pg = require('pg');
const config = require('../database/psql.js')
const pool = new pg.Pool(config);

router.get('/bestmoments', (req, res, next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT * FROM BestMoment ORDER BY id ASC', function (err, result) {
             done();
             if (err) {
                 console.log(err);
                 res.status(400).send(err);
                 next()
             }
             res.render("bestMomentsView",result);
            })
         })
    });
