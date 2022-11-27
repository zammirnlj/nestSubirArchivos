const path = require('path');
const exphbs = require ('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const erroHandler = require('errorhandler');
const routes = require('../routes/index');
const uuid = require('uuid').v4
const { randomUUID } = require('crypto');


module.exports = app => {


    //configuracion server
    app.set('port', process.env.PORT || 3000);

    //Configuracion de Handlebars
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs.engine({

        defaultLayout: 'main',
        partialDir: path.join(app.get('views'), 'patials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require ('./helpers')

    }));
    app.set ('view engine', '.hbs' );
    

    //midlewares
    const storage = multer.diskStorage({
        destination: path.join(__dirname,'../public/upload'),

        filename: (req, file,cb) => {
            cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
        }
    });

    app.use(morgan('dev'));
    //app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));

    app.use (multer({
       
        storage,
        dest: path.join(__dirname,'../public/upload/temp'),
       // limits: (fileSize: 3000000),
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
              cb(null, true);
            } else {
              cb(null, false);
              return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
          }

}).single('image'))
    
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