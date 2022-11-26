const ctrl ={};
//Importar el filesistem para moverlo a la ruta uqload
const fs = require('fs-extra');
//Path para subir imagenes e importarla
const path = require('path');
const { randomNumber } = require('../helpers/libs');
ctrl. index = (req, res) => {
    
};

//Metodo create para subir imagenes

ctrl. create = async (req, res) => {

    //Importar de libs para subir foto
    const imgUrl = randomNumber();
    console.log(imgUrl);

    


    //direccion de archivo
    const imageTempPath = req.file.path;
//obtener datos y subir imagen 
   // console.log(req.file);
   const ext = path.extname(req.file.originalname).toLowerCase();
    const targetPath = path.resolve('src/public/upload/${imgUrl}${ext');
   

   //Condicion para empezar a mover la imagen a upload

   if (ext === '.png' || ext === '.jpeg' || ext === 'jpg' || ext === '.gif'){
    //empezar a utilizar el file sistem

   await fs.rename(imageTempPath, targetPath);
   }

   //Retornar respuesta de si funciona
   res.send('works');
};

ctrl. like = (req, res) => {
   
};

ctrl. comment = (req, res) => {
   
};

ctrl. remove = (req, res) => {
   
};
module.exports = ctrl;
