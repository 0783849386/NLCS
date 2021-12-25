const express = require('express');
const router = express.Router();
const controller = require('../controllers/trogiup.controller');

router.get('/thutuc', controller.thutuc);
router.get('/muonsach', controller.muonsach);
router.get('/noiquy', controller.noiquy);
router.get('/lich', controller.lich);
router.get('/quydinh', controller.quydinh);

module.exports = router;