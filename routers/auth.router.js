const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');
const validate = require('../validate/sinhvien.validate');

router.get('/login', controller.index);
router.post('/login', controller.postLogin);
router.get('/register', controller.register);
router.post('/register', validate.postRegister, controller.postRegister);

module.exports = router;