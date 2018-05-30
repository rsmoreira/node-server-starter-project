const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys/keys');
const session = require('express-session')
const parseurl = require('parseurl');
const passport = require('passport');
const bodyParser = require('body-parser');
/**
 * Always load firstly the models that will be used
 * in other JS files
 */
require('./models/User');
require('./config/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
require('./config/express-session')(app);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/_configRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);   