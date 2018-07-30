const express = require('express')
const router = express()
router.set('view engine', 'hbs')
router.set('views', './server/views')
const hbs = require('hbs')
hbs.registerPartials('./server/views/partials')

module.exports = router

router.get('/tournaments', (req, res, next) => {
    res.render("noInfoView");
    });