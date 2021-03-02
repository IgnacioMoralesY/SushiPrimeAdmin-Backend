const { Router } = require('express');
const { getAll, getAsistenciaTienda } = require('../controllers/asistencia');
const { validatorPost } = require('../middlewares/validator');
const { check } = require('express-validator');
const { idTiendaExist } = require('../helpers/database-validator');

const router = Router();

router.get('/getAll/', getAll);

router.get('/getAll/:idTienda', [
    check('idTienda').custom(idTiendaExist),
    validatorPost
], getAsistenciaTienda);


module.exports = router;