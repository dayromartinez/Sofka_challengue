var express = require('express');
var router = express.Router();
const { Categoria, Pregunta } = require('../db.js');

var contador = 0;
const STATUS_USER_ERROR = 404;
const STATUS_OK = 200;


//Ruta para obtener categorias
router.get('/categorias', async(req, res) => {

    const { id } = req.query;

    try {
        
        const categoria = await Categoria.findByPk(id, {include: Pregunta});

        if(categoria === null){
            res.status(STATUS_USER_ERROR).json({error: "No hay categorias registradas"});
        }else{
            res.status(STATUS_OK).json(categoria);
        }
    } catch (error) {
        console.log(error);
    }
})


//Ruta para crear categorias
router.post('/categorias', async (req, res) => {

    //Recibe los datos recolectados desde el formulario
    //Crea la categoria en la base de datos

    const { nombre, puntos, id} = req.body;

    try {
    
        const [categoria, created] = await Categoria.findOrCreate({
            where: { id: id },
            defaults: {
                id: contador + 1,
                nombre: nombre,
                puntos: puntos
            }
        });

        if(created){
            contador++;
            res.status(STATUS_OK).json(categoria);
        }else{
            res.status(STATUS_USER_ERROR).json("Esa categoria ya existe");
        }
        
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;