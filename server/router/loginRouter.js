const express = require('express')
const router = express()
router.set('view engine', 'hbs')
router.set('views', './server/views')
const hbs = require('hbs')
hbs.registerPartials('./server/views/partials')
module.exports = router

const expressSession = require('express-session')({ secret: 'its a secret', resave: true, saveUninitialized: true })
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const usersRepository = require('../repo/userRepo.js')()

passport.use(new LocalStrategy(
function (username, password, done) {
    const user = usersRepository.verifyCredentials(username, password)
    return user ? done(null, user) : done(null, false)
}
))

router.use(expressSession)
router.use(passport.initialize())
router.use(passport.session())

const signInRoutes = {
login: '/login',
logout: '/logout'
}
router.get('/login', (req, res) => {
const loginUrl = `${req.protocol}://${req.headers.host}${req.url}`
res.render('login.hbs', {
    menuState: { signInRoutes, user: req.user },
    action: signInRoutes.login,
    failedAttempt: loginUrl === req.headers.referer
})
})

router.get('/logout', (req, res) => { req.logout(); res.redirect('/') })

router.post(signInRoutes.login,
passport.authenticate('local', { failureRedirect: signInRoutes.login }),
(req, res) => res.redirect('/')
)

passport.serializeUser((user, done) => { done(null, user) })
passport.deserializeUser((id, done) => { done(null, id) })
