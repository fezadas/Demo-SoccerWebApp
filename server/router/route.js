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
const usersRepository = require('../repo/userRepo.js')()
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
  hbs.registerHelper('zero', (theOne) => theOne >= 0)

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
  app.use(express.static(path.join(__dirname, 'static')))

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
            result.user = req.user;
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

  app.get('/players/:id', (req, res, next) => {
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

  app.get('/games/:id', (req, res, next) => {
        const id = req.params.id;
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("Can not connect to the DB" + err);
            }
            client.query('SELECT idGame,idPlayer,name,P.goals,P.assits,result,date,team FROM Player INNER JOIN ( '+
                'SELECT idGame,idPlayer,GamePlayerRelation.goals,GamePlayerRelation.assits,GamePlayerRelation.team,result,date FROM ( '+
                '(SELECT * FROM "Game" where id='+id+') as G INNER JOIN GamePlayerRelation ON G.id = GamePlayerRelation.idGame)) as P '+
            'ON Player.id=P.idPlayer ', function (err, result) {
                 done();
                 if (err) {
                     console.log(err);
                     res.status(400).send(err);
                     next()
                 }
                 if(!result.rows.length) res.render("noInfoView.hbs")
                 else{
                 var team1 = result.rows.filter(player => player.team == 1);
                 var team2 = result.rows.filter(player => player.team == 2);
                 res.render("gameInfoView",
                 {
                     id:id,
                     result:result.rows[0].result,
                     date:result.rows[0].date,
                     team1:team1,
                     team2:team2
                 }
                )}
                })
             })
        }); 

  app.get('/nextgame', (req, res, next) => {
        pool.connect(function (err, client, done) {
            if (err) {
                console.log("Can not connect to the DB" + err);
            }
            /*client.query('SELECT * FROM NextGame ORDER BY id DESC limit 1', function (err, result) {
                 done();
                 if (err) {
                     console.log(err);
                     res.status(400).send(err);
                     next()
                 }
                 res.render("nextgameView",result);
                })
             })*/
            })
             res.render("noGameView")
        });   

/***************************************   CONTACT ROUTES        ************************************************** */
  app.get('/contacts', (req, res, next) => {
            res.render("contactsView");
            });
    

/************************************      LOGIN ROUTES          **************************************************** */
const expressSession = require('express-session')({ secret: 'its a secret', resave: true, saveUninitialized: true })
  const passport = require('passport')
  const LocalStrategy = require('passport-local').Strategy

  passport.use(new LocalStrategy(
    function (username, password, done) {
      const user = usersRepository.verifyCredentials(username, password)
      return user ? done(null, user) : done(null, false)
    }
  ))

  app.use(expressSession)
  app.use(passport.initialize())
  app.use(passport.session())

  const signInRoutes = {
    login: '/login',
    logout: '/logout'
  }
  app.get('/login', (req, res) => {
    const loginUrl = `${req.protocol}://${req.headers.host}${req.url}`
    res.render('login.hbs', {
      menuState: { signInRoutes, user: req.user },
      action: signInRoutes.login,
      failedAttempt: loginUrl === req.headers.referer
    })
  })

  app.get('/logout', (req, res) => { req.logout(); res.redirect('/') })

  app.post(signInRoutes.login,
    passport.authenticate('local', { failureRedirect: signInRoutes.login }),
    (req, res) => res.redirect('/')
  )

  passport.serializeUser((user, done) => { done(null, user) })
  passport.deserializeUser((id, done) => { done(null, id) })

/************************************      YOUTUBE ROUTES          **************************************************** */

app.get('/highlights', (req, res, next) => {
    res.render("highlightsView");
    });

  return app
}
