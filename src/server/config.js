const path = require('path');
const exphbs = require ('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const erroHandler = require('errorhandler');
const routes = require('../routes/index');


module.exports = app => {


    //configuracion server
    app.set('port', process.env.PORT || 3000);

    //Configuracion de Handlebars
    app.set('views', path.join(__dirname, 'views'));
    app.engine('.hbs', exphbs.engine({

        defaultLayout: 'main',
        partialDir: path.join(app.get('views'), 'patials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require ('./helpers')

    }));
    app.set ('view engine', '.hbs' );
    

    //midlewares

    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    //formulario recibir datos
    app.use(express.urlencoded({extended: false}));
    //manejo de likes
    app.use(express.json());
    //routes
    routes(app);

    //static files
    app.use('/public',express.static(path.join(__dirname,'../public')))

    //errohabdlers
    if ('development' === app.get('env')){
        app.use(erroHandler);
    }

    return app;

}