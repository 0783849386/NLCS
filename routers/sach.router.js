const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "public/sachImg/" });
const controller = require('../controllers/sach.controller');
const validate = require('../validate/sach.validate');

router.get('/show', controller.show);
router.post('/show', upload.single('hinhanh'), controller.postCreate);
router.post('/timkiemSach', controller.timkiemSach);
router.post('/updateSach', upload.single('hinhanhUp'), controller.updateSach);

module.exports = router;