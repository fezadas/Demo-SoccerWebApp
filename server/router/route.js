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

const pg = require('pg');
const config = require('../database/psql.js')
const pool = new pg.Pool(config);

const playersRouter = require('../router/playersRouter.js')
const loginRouter = require('../router/loginRouter.js')
const gamesRouter = require('../router/gamesRouter.js')
const contactsRouter = require('../router/contactsRouter.js')
const youtubeRouter = require('../router/youtubeRouter.js')
const bestMomentsRouter = require('../router/bestMomentsRouter.js')
const tournamentsRouter = require('../router/tournamentsRouter.js')

module.exports = exports = function () {
     
  const router = express()
  const path = require('path')
  const hbs = require('hbs')
  const methodOverride = require('method-override')
  hbs.registerHelper('zero', (theOne) => theOne >= 0)

  router.set('view engine', 'hbs')
  router.set('views', './server/views')
  hbs.registerPartials('./server/views/partials')
  hbs.registerHelper('equals', (theOne, theOther) => theOne === theOther)

  router.use(playersRouter)
  router.use(loginRouter)
  router.use(gamesRouter)
  router.use(contactsRouter)
  router.use(youtubeRouter)
  router.use(bestMomentsRouter)
  router.use(tournamentsRouter)

  router.use((req, res, next) => {
    const oldEnd = res.end
    res.end = function (...args) {
      console.log(`Serviced ${req.method} ${req.originalUrl} with status code ${res.statusCode}`)
      return oldEnd.call(this, ...args)
    }
    next()
  })

  router.use(express.urlencoded({ extended: true }))
  router.use(express.static(path.join(__dirname, 'static')))
  router.use(express.json())
  router.use(methodOverride('_method'))

  router.get('/create', (req, res, next) => {
      res.render('createView')
  })

  router.get('/', (req, res, next) => {
    let scorer 
    let player 
    let assister 
    let injury 
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        
        
        client.query('SELECT name FROM Player ORDER BY goals DESC LIMIT 1', function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            
            }
            scorer = result.rows[0].name
           })
        client.query('SELECT name FROM Player ORDER BY assists DESC LIMIT 1', function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            
            }
            assister = result.rows[0].name
           })
           client.query('SELECT name,injury FROM Player where injury is not null', function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            
            }
            injury = result.rows[0]
           })
        client.query('SELECT name FROM Player ORDER BY appearance DESC LIMIT 2', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            
            }
            player = result.rows
            res.render("homeView",
           {player:player,
            assister:assister,
            scorer:scorer,
            injury:injury
        }
    )
           })
    })
    
})
    

  router.use(function(req, res, next){
        res.status(404);
        
        // respond with html page
        if (req.accepts('html')) {
            res.render('404View', { url: req.url });
            return;
        }
        
        // respond with json
        if (req.accepts('json')) {
            res.send({ error: 'Not found' });
            return;
        }
        
        // default to plain-text. send()
        res.type('txt').send('Not found');
        });


    return router
}
