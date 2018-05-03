const parseurl = require('parseurl');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const keys = require('./keys/keys');

module.exports = app => {
    
    // express-session configuration
    
    const sess = {
            secret: keys.cookieKey,
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 30 * 24 * 60 * 60 * 1000
            },
            store: new MongoStore({ mongooseConnection: mongoose.connection })
        };
    
    // configure secure for production environment
    if (process.env.NODE_ENV === 'production') {
        app.set('trust proxy', 1); // trust first proxy
        sess.cookie.secure = true; // serve secure cookies
    }

    app.use(session(sess));

    // count views function - totally not necessary
    app.use(function (req, res, next){
        if (!req.session.views) {
            req.session.views = {}
        }
    
        var pathname = parseurl(req).pathname
        req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
    
        next()
    });

}