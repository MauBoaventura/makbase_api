var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')

module.exports = {
    async fail_login(req, res) {
        res.json({ dados: "You fail to login" })
    },

    async success_login(req, res) {
        res.json({
            error: "You are in the aplication",
            dados: req.user
        })
    },

    isLoggedIn(req, res, next) {
        if (req.user) {
            next()
        } else {
            return res.status(401).send()
        }
    },

    logout(req, res) {
        req.session = null
        req.logout()
        res.redirect('/good')
    },
   
}