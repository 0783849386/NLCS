const connection = require('../dbmysql/db.mysql');
const sachDB = require('../models/quanli.model');
const formidable = require("formidable");
const fs = require('fs');


module.exports.show = function(req, res){
	var tensach = req.cookies.tensach || '';
	sachDB.danhMucSachTenSach(req.conn, [tensach],function(err1, result1){
		if(err1) throw err1;
		sachDB.sachDangMuon(req.conn, function(err2, result2){
			if(err2) throw err2;
			// Tao truong so luong sach dang muon cho danh muc sach
			var danhMucSach = result1;
			for(var i=0 ; i < danhMucSach.length ; i++){
				var temp = 0;
				for(var j=0; j<result2[0].length ; j++){
					if(danhMucSach[i].idsach == result2[0][j].idsach){
						danhMucSach[i].soluongMuon = result2[0][j].soluong;
						temp = 1;
						
						break;
					}
				}
				if(temp == 0) {
					danhMucSach[i].soluongMuon = 0;
				}
			}
			res.render('quanli/sach', {
				danhmucsach: danhMucSach,
				username: req.cookies.username
			});
		});
	});
}

module.exports.create = function(req, res){
	res.redirect('/sach/show');
}
module.exports.postCreate = function(req, res){
	var tensach = req.body.tensach;
	var tacgia = req.body.tacgia;
	var soluong = parseInt(req.body.soluong);
	if(req.file){
		let hinhanh = req.file.filename;
		sachDB.createDanhMucSachImg(req.conn, [tensach, tacgia, hinhanh, soluong], function(err, results){
		if(err) throw err;
		console.log('1 record inserted.');
	});
	}
	else {
		sachDB.createDanhMucSach(req.conn, [tensach, tacgia, soluong], function(err, results){
		if(err) throw err;
		console.log('1 record inserted.');
	});
	}
	res.redirect('/sach/show');
}

module.exports.updateSach = function(req, res){
	let idsach = req.body.idsachUp;
	let tensach = req.body.tensachUp;
	let tacgia = req.body.tacgiaUp;
	let soluong = req.body.soluongUp;
	if(req.file){
		let hinhanh = req.file.filename;
		sachDB.updateDanhMucSachImg(req.conn, [tensach, tacgia, hinhanh, soluong, idsach], function(err3){
			if(err3) throw err3;
		});
	}
	else{
		sachDB.updateDanhMucSach(req.conn, [tensach, tacgia, soluong, idsach], function(err3){
			if(err3) throw err3;
		});
	}
	
	res.redirect('/sach/show');
}
module.exports.updateSachImg = function(req, res){
	if (req.url == '/updateSachImg') {
		var form = new formidable.IncomingForm();
		console.log(form);
		form.parse(req, function (err1, fields, files) {
			var oldpath = files.hinhanhUp.path;
			var newpath = './public/sachImg/' + files.hinhanhUp.name;
			if( newpath != './public/sachImg/'){
				fs.rename(oldpath, newpath, function (err2) {
					if (err2) throw err2;
					var hinhanh = newpath;
					sachDB.updateDanhMucSachImg(req.conn, [hinhanh], function(err3){
						if(err3) throw err3;
					});
				});
			}

			
		});
	}
	
	res.redirect('/sach/show');
}
module.exports.timkiemSach = function(req, res){
	var tensach = req.body.timkiem;
	res.cookie('tensach', tensach);
	res.redirect('/sach/show');
}