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

router.get('/games', (req, res, next) => {
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

  router.get('/games/:id', (req, res, next) => {
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

  router.get('/nextgame', (req, res, next) => {
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
                 if(result.rowCount > 0)
                 res.render("nextgameView",result);
                 else  res.render("noGameView")
                })
             })
        });  