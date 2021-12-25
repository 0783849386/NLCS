const express = require('express');
const router = express.Router();

const controller = require('../controllers/renderData.controller');

router.get('/phieumuon', controller.phieuMuon);
router.get('/danhmucsach', controller.danhMucSach);
router.get('/timkiemsach/:tensach', controller.timKiemSach);


module.exports = router;