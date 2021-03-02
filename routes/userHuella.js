const { Router } = require('express');
const { getAll, remove } = require('../controllers/userHuella');
const { validatorPost } = require('../middlewares/validator');
const { check } = require('express-validator');
const { existIdHuella } = require('../helpers/database-validator');

const router = Router();

router.get('/', getAll);

router.delete('/:id', [
    check('id').custom(existIdHuella),
    validatorPost
] , remove);

module.exports = router;