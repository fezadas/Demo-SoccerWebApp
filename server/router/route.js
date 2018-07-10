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

module.exports = exports = function () {
  const app = express()
  const path = require('path')
  const hbs = require('hbs')
  const methodOverride = require('method-override')

  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, './views'))

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

  app.get('/home', (req, res, next) => {
    pool.connect(function (err, client, done) {
        if (err) {
            console.log("Can not connect to the DB" + err);
        }
        res.render("menu.hbs")
    });

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
             }
             res.status(200).send(result.rows);
            })
         })
    });

    app.get('/players/:id', (req, res, next) => {
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

  return app
}