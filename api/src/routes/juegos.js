var express = require('express');
var router = express.Router();
const { Juego, Usuario } = require('../db.js');

var contador = 0;
const STATUS_USER_ERROR = 404;
const STATUS_OK = 200;


//Ruta para registrar juegos
router.post('/juegos', async (req, res) => {

    //Recibe los datos recolectados desde el formulario
    //Crea un registro de juego en la base de datos

    const { ronda, puntuacion, retiro, expulsion, id, id_usuario } = req.body;

    try {
    
        const [juego, created] = await Juego.findOrCreate({
            where: { id: id },
            defaults: {
                id: contador + 1,
                ronda: ronda,
                puntuacion: puntuacion,
                retiro: retiro,
                expulsion: expulsion,
                usuarioId: id_usuario
            }
        });

        if(created){
            contador++;
            res.status(STATUS_OK).json(juego);
        }
        
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;