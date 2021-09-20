var express = require('express');
var router = express.Router();
const { Usuario, Juego } = require('../db.js');

var contador = 0;
const STATUS_USER_ERROR = 404;
const STATUS_OK = 200;

//Ruta para loguear usuarios
router.get('/usuarios', async(req, res) => {

    const { nombre } = req.query;

    
    try {

        const usuario = await Usuario.findOne({
            include: Juego,
            where: {
                nombre: nombre
            },
        }); 
    
        if(usuario === null){
            res.status(STATUS_OK).json({error: "Usuario no encontrado. Intentelo nuevamente."});
        }else{
            res.status(STATUS_OK).json(usuario);
        }

    } catch (error) {
        console.log(error);
    }
})

//Ruta para crear usuario
router.post('/usuarios', async (req, res) => {

    //Recibe los datos recolectados desde el formulario
    //Crea un usuario en la base de datos

    const { nombre, password } = req.body;
    console.log(nombre, password);
    try {   
    
        const usuario = await Usuario.create({
            
                id: contador + 1,
                nombre: nombre,
                password: password
            
        });

        if(usuario){
            contador++;
            res.status(STATUS_OK).json(usuario);
        }
        
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;