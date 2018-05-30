
module.exports = app => {

    app.post('/test/body-parser', (req, res) => {
        console.log(req.body);
        res.status(200).send(req.body);
    });
    
    app.get('/test/foo', function (req, res, next) {
        res.send('Test Views - you viewed this page ' + req.session.views['/foo'] + ' times')
    })
    
    app.get('/test/bar', function (req, res, next) {
        res.send('Test Views - you viewed this page ' + req.session.views['/bar'] + ' times')
    })

};