var express = require('express');
var router = express.Router();
const { Pregunta, Categoria } = require('../db.js');
const fetch = require('node-fetch');
const { conn } = require('../db.js');

var contador = 0;
const STATUS_USER_ERROR = 404;
const STATUS_OK = 200;

router.post('/preguntas', async (req, res) => {

    //Recibe los datos recolectados desde el formulario
    //Crea la pregunta en la base de datos

    const { interrogante, id_categoria, opc1, opc2, opc3, opc4, respuesta } = req.body;

    try {
    
        const [pregunta, created] = await Pregunta.findOrCreate({
            where: { interrogante: interrogante },
            defaults: {
                id: contador + 1,
                interrogante: interrogante,
                opc1: opc1,
                opc2: opc2,
                opc3: opc3,
                opc4: opc4,
                respuesta: respuesta,
                categoriaId: id_categoria
            }
        });

        if(created){
            contador++;
            res.status(STATUS_OK).json(pregunta);
        }else{
            res.status(STATUS_USER_ERROR).json("Esa pregunta ya existe");
        }
        
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;