const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys/keys.js');
const users = require('../app/controllers/users.server.controller');

/**
 * Configuring passport to treat the Cookie serialization and 
 * deserialization.
 * 
 * The 'user' is the retrieved/authenticated user that we
 * have work with on our GoogleStrategy callback function.
 * 
 */
passport.serializeUser((user, done) => {
    // This user.id, is the id generated on the Users Collection, on MongoDB.
    // It isn't the profile.id.
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    users.configDeserializeUser(id, done);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            /**
             * This is the callback function called after 
             * Google have validated with the user through 
             * OAuth.
             */
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            var providerUserProfile = {
                firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				displayName: profile.displayName,
				email: profile.emails[0].value,
				username: profile.username,
                provider: 'google',
				providerIdentifierField: 'id',
                providerData: providerData
            }

            users.saveOAuthUserProfile(providerUserProfile, done);
        }
    )
);