const express = require('express');
const router = express.Router();
const controller = require('../controllers/quanli.controller');

router.get('/home', controller.home);
router.get('/sinhvien', controller.sinhvien);
router.get('/muonsach', controller.muonsach);
router.get('/duyet/:mssv', controller.duyet);
router.post('/nhanSach/:idmuon', controller.nhanSach);
router.post('/updateSinhVien', controller.updateSinhVien);
router.get('/loadSinhVien/:mssv', controller.loadSinhVien);
router.post('/addPhieuMuon/:idsach', controller.addPhieuMuon);
router.delete('/deleteGioHang/:idgiohang', controller.deleteGioHang);
router.get('/timkiem/:tensach', controller.timkiem);
router.get('/xacnhan', controller.xacnhan);
router.get('/lichsu', controller.lichsu);

module.exports = router;