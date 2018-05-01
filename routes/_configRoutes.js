module.exports = app => {
    require('./authRoutes')(app);
    require('./sessionTestRoutes')(app);
}