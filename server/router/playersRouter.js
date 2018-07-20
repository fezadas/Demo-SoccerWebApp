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

router.get('/players', (req, res, next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT * FROM Player order by goals desc', function (err, result) {
             done();
             if (err) {
                 console.log(err);
                 res.status(400).send(err);
                 next()
             }
             res.render("playersView",result);
            })
         })
    });

  router.get('/players/:id', (req, res, next) => {
      const id = req.params.id
    pool.connect(function (err, client, done) {
    if (err) {
    console.log("Can not connect to the DB" + err);
    }
    client.query('SELECT A.appearance,A.name,A.year_of_birth,A.id,A.goals,A.assists,PlayerInfo.description,PlayerInfo.img,PlayerInfo.position FROM (SELECT * from Player where id='+id+') as A INNER JOIN PlayerInfo ON A.id=PlayerInfo.id', function (err, result) {
        done();
        if (err) {
            console.log(err);
            res.status(400).send(err);
            next()
        }
        res.setHeader('content-type', 'text/html; charset=utf-8');
        res.render("playerView",result);
    })
    })
    });