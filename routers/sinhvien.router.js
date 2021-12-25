const express = require('express');
const router = express.Router();
const controller = require('../controllers/sinhvien.controller');

router.get('/home', controller.home);
router.get('/sach', controller.sach);
router.get('/lienhe', controller.lienhe);
router.get('/timkiem/:tensach', controller.timkiem);
router.get('/muonsach', controller.muonsach);
router.get('/lichsu', controller.lichsu);
router.post('/createPhieuMuon/:idsach', controller.addPhieuMuon);
router.delete('/deleteGioHang/:idgiohang', controller.deleteGioHang);
router.post('/createDanhSachDuyet', controller.addDanhSachDuyet);
router.delete('/deleteDanhSachDuyet', controller.xoaDanhSachDuyet)

module.exports = router;