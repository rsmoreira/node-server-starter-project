const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const session = require('express-session')
const parseurl = require('parseurl');
const passport = require('passport');
/**
 * Always load firstly the models that will be used
 * in other JS files
 */
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

require('./services/express-session-service-config')(app);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/_configRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);   