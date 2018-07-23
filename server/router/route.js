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

module.exports = exports = function () {
     
  const router = express()
  const path = require('path')
  const hbs = require('hbs')
  const methodOverride = require('method-override')
  hbs.registerHelper('zero', (theOne) => theOne >= 0)

  router.set('view engine', 'hbs')
  router.set('views', './server/views')
  hbs.registerPartials('./server/views/partials')

  router.use(playersRouter)
  router.use(loginRouter)
  router.use(gamesRouter)
  router.use(contactsRouter)
  router.use(youtubeRouter)

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

  router.use(express.urlencoded({ extended: true }))
  router.use(express.json())

  router.use(methodOverride('_method'))

  router.get('/', (req, res, next) => {
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
            result.user = req.user;
            res.render("homeView",result);
           })
    });
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
