const express = require('express');
const router = express.Router();
const controller = require('../controllers/sach.controller');
const validate = require('../validate/sach.validate');

router.get('/show', controller.show);
router.post('/show', validate.postCreate, controller.postCreate);
router.post('/updateSach', controller.updateSach);

module.exports = router;