const express = require('express')
const router = express()
router.set('view engine', 'hbs')
router.set('views', './server/views')
const hbs = require('hbs')
hbs.registerPartials('./server/views/partials')

module.exports = router

router.get('/highlights', (req, res, next) => {
    res.render("highlightsView");
    });

router.get('/photos', (req, res, next) => {
    res.render("photosView");
    });    