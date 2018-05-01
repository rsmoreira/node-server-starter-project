const mongoose = require('mongoose');

const User = mongoose.model('users');


exports.configDeserializeUser = (id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
}

/**
 * saveOAuthUserProfile
 * 
 * Method used to persist the User into the database, if it
 * hasn't been done before. 
 * 
 * DONE - 
 *  It is the Passport's callback function used to tell Passport 
 *  that our callback was finished successfully. It will be called 
 *  after the User has been retrieved or created on the Database. 
 */
exports.saveOAuthUserProfile = (providerUserProfile, done) => {
    User.findOne({ googleId : providerUserProfile.id })
        .then((existingUser) => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                new User({ googleId : providerUserProfile.id })
                    .save()
                    .then(user => done(null, user));
            }
        });
}