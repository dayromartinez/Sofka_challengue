const { Router } = require('express');
// Importar todos los routers;
const router_usuarios = require('../routes/usuarios.js');
const router_categorias = require('../routes/categorias.js');
const router_preguntas = require('../routes/preguntas.js');
const router_juegos = require('../routes/juegos.js');

const router = Router();

// Configurar los routers

router.use('/', router_usuarios);
router.use('/', router_categorias);
router.use('/', router_preguntas);
router.use('/', router_juegos);

module.exports = router;
