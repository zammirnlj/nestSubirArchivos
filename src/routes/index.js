const express = require ('express');
const router = express.Router();

const home = require('../controllers/home');
const image = require('../controllers/image');

module.exports = app => {
/*

LO MISMO DE ABAJO PERO DEUCIDO E IMPORTADO 
   router.get ('/', (req,res) =>{

        res.send('Index page');
    });
*/

router.get('/', home.index);

//ruta para ver imagenes
router.get('/images/:image_id', image.index);
//ruta crear imagenes
router.post('/images', image.create);
//Ruta para dar like a la imagen
router.post('/images/:image_id/like', image.like);
//Comentarios en foto
router.post('/images/:image_id/comment', image.comment);
//Eliinar una imaagen
router.delete('/images/:image_id', image.remove);

app.use(router);


};