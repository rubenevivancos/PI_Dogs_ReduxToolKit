const { Router } = require('express');

const dogs = require('./dogs');


const router = Router();

// Configurar los routers
router.use('/dogs', dogs);


module.exports = router;
