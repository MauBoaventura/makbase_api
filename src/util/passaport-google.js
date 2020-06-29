const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3031/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {

        // console.log("Profile:")
        // console.log(profile)
        // console.log("accessToken:")
        // console.log(accessToken)
        // console.log("refreshToken:")
        // console.log(refreshToken)

        // Cadastrar no banco de dados ou verificar se ja existe pelo profile.id

        return cb(null, profile,);

    }
));
