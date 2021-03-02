const { Router } = require('express');
const { getAll, add, update, remove } = require('../controllers/tienda');
const { validatorPost } = require('../middlewares/validator');
const { check } = require('express-validator');
const { idTiendaExist, nombreTiendaNotExist } = require('../helpers/database-validator');

const router = Router();

router.get('/', getAll);

router.post('/', [
    check('nombre', 'El nombre no debe ir vacio' ).not().isEmpty(),
    check('nombre').custom(nombreTiendaNotExist),
    validatorPost
] , add);

router.put('/:id', [
    check('nombre', 'El nombre no debe ir vacio' ).not().isEmpty(),
    validatorPost
] , update);

router.delete('/:id', [
    check('id').custom(idTiendaExist),
    validatorPost
] , remove);

module.exports = router;