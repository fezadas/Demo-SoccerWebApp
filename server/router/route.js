'use strict'

/**
 * Module that contains the main set of routes.
 * @module routes
 */

/**
 * Module dependencies.
 * @private
 */
const express = require('express')
const config = {
    host:'ec2-54-235-66-81.compute-1.amazonaws.com',
    user: 'yaqralrajdjqyz',
    database: 'd3d5jccv5mvkm1',
    password: 'ee05bdd77d2a0f664c504fba57e77fee496731670abbfe1f8bf87aff5e08a2f7',
    port: 5432,
    ssl: true
};

const pg = require('pg');
// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

module.exports = exports = function () {
  const app = express()
  const path = require('path')
  const hbs = require('hbs')
  const methodOverride = require('method-override')

  app.set('view engine', 'hbs')
  app.set('views', './server/views')
  hbs.registerPartials('./server/views/partials')

  app.use((req, res, next) => {
    const oldEnd = res.end
    res.end = function (...args) {
      console.log(`Serviced ${req.method} ${req.originalUrl} with status code ${res.statusCode}`)
      return oldEnd.call(this, ...args)
    }
    next()
  })

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(methodOverride('_method'))

  app.get('/', (req, res, next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        res.render("menuView")
    });
    })

  app.get('/players', (req, res, next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT * FROM "Player"', function (err, result) {
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

  app.get('/players/:id', (req, res, next) => {
      const id = req.params.id
    pool.connect(function (err, client, done) {
    if (err) {
    console.log("Can not connect to the DB" + err);
    }
    client.
    client.query('SELECT * FROM "Player" WHERE id= ?',[id], function (err, result) {
        done();
        if (err) {
            console.log(err);
            res.status(400).send(err);
            next()
        }
        res.render("playerView",result);
    })
    })
    });

    return app
}


