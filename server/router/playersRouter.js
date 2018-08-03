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

router.use((req, res, next) => {
    const oldEnd = res.end
    res.end = function (...args) {
      console.log(`Serviced ${req.method} ${req.originalUrl} with status code ${res.statusCode}`)
      return oldEnd.call(this, ...args)
    }
    next()
  })

router.get('/players', (req, res, next) => {
    let query = 'SELECT * FROM Player order by '
    if(req.query.orderby) query = query+req.query.orderby + ' desc'
    else query = query + 'goals desc'
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query(query, function (err, result) {
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