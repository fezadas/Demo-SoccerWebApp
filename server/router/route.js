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
    host:'ec2-54-228-251-254.eu-west-1.compute.amazonaws.com',
    user: 'gtexsakxjefxwv',
    database: 'd6ir5dq0qbhogc',
    password: '729d20a96ae0fa56d1dec54de5c8a3b82b3fb3ae89019b8f32317be598305248',
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
        client.query('SELECT * FROM "Game" ORDER BY id DESC LIMIT 3', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            
            }
            res.render("menuView",result);
           })
    });
    })

    /***************************************   PLAYERS ROUTES     ************************************************** */


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

   /***************************************   GAMES ROUTES        ************************************************** */

  app.get('/games', (req, res, next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        client.query('SELECT * FROM "Game" ORDER BY id ASC', function (err, result) {
             done();
             if (err) {
                 console.log(err);
                 res.status(400).send(err);
                 next()
             }
             res.render("gamesView",result);
            })
         })
    });

  app.get('/nextgame', (req, res, next) => {
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("Can not connect to the DB" + err);
            }
            client.query('SELECT * FROM NextGame ORDER BY id DESC limit 1', function (err, result) {
                 done();
                 if (err) {
                     console.log(err);
                     res.status(400).send(err);
                     next()
                 }
                 res.render("nextgameView",result);
                })
             })
        });   

/***************************************   CONTACT ROUTES        ************************************************** */
  app.get('/contacts', (req, res, next) => {
            res.render("workinprogressView");
            });
    return app
}


