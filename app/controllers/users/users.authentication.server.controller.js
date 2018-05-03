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
    User.findOne({ googleId : providerUserProfile.providerData.id })
        .then((existingUser) => {
            if (existingUser) {
                done(null, existingUser);
            } else {

                var providerUserName = providerUserProfile.username || 
                                        ((providerUserProfile.email) ?  
                                            providerUserProfile.email.split('@')[0] : '');

                new User({ 
                
                    googleId : providerUserProfile.providerData.id,
                    firstName: providerUserProfile.firstName,
                    lastName: providerUserProfile.lastName,
                    username: providerUserName,
                    displayName: providerUserProfile.displayName,
                    email: providerUserProfile.email,
                    provider: providerUserProfile.provider,
                    providerData: providerUserProfile.providerData 
                
                })
                    .save()
                    .then(user => done(null, user));
            }
        });
}