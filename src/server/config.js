module.exports = app => {

    app.set('port', process.env.PORT || 3002);

    return app;

}