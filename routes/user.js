const { Router } = require('express');
const { getAll, add, update, remove, login, bloquear, desbloquear } = require('../controllers/user');
const { validatorPost } = require('../middlewares/validator');
const { check } = require('express-validator');
const { rutNotExist, idUsertExist, rutExist } = require('../helpers/database-validator');

const router = Router();

router.get('/test', (req, res) => {
    res.send('entre');
});

router.get('/', getAll);

router.post('/', [
    check('rut', 'El rut no debe ir vacio' ).not().isEmpty(),
    check('nombre', 'El nombre no debe ir vacio' ).not().isEmpty(),
    check('apellido', 'El apellido no debe ir vacio' ).not().isEmpty(),
    check('rol', 'El rol no debe ir vacio' ).not().isEmpty(),
    check('rut').custom(rutNotExist),
    validatorPost
] , add);

router.put('/:id', [
    check('id').custom(idUsertExist),
    check('rut', 'El rut no debe ir vacio' ).not().isEmpty(),
    check('nombre', 'El nombre no debe ir vacio' ).not().isEmpty(),
    check('apellido', 'El apellido no debe ir vacio' ).not().isEmpty(),
    check('rol', 'El rol no debe ir vacio' ).not().isEmpty(),
    validatorPost
] , update);

router.delete('/:id', [
    check('id').custom(idUsertExist),
    validatorPost
] , remove);

router.post('/login', [
    check('rut').custom(rutExist),
    check('password', 'El password no debe ir vacio' ).not().isEmpty(),
    validatorPost
] , login);

router.put('/bloquear/:id', [
    check('id').custom(idUsertExist),
    validatorPost
] , bloquear);

router.put('/desbloquear/:id', [
    check('id').custom(idUsertExist),
    validatorPost
] , desbloquear);

module.exports = router;