
module.exports = app => {

    app.get('/foo', function (req, res, next) {
        res.send('Test Views - you viewed this page ' + req.session.views['/foo'] + ' times')
    })
    
    app.get('/bar', function (req, res, next) {
        res.send('Test Views - you viewed this page ' + req.session.views['/bar'] + ' times')
    })

    app.get('/api/current_session', (req, res) => {
        res.send(req.session);
    });

};