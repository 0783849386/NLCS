const connection = require('../dbmysql/db.mysql');
const sinhvienDB = require('../models/sinhvien.model');

module.exports.home = function(req, res){
	var mssv = req.cookies.mssv;
	sinhvienDB.getSinhVienMssv(req.conn, [mssv], function(err, results){
		if(err) throw err;
		var sql_lichsu = 'call lichsusinhvien(?)';
		connection.query(sql_lichsu, [mssv], function(err1, result_ls){
			if(err1) throw err1;
			var sql_danhsach = 'call sachsinhviendangmuon(?)';
			connection.query(sql_danhsach, [mssv], function(err2, result_ds){
				if(err2) throw err2;
				res.render('sinhvien/home_sinhvien',{
					username: results[0],
					lichsu: result_ls[0],
					danhsach: result_ds[0]
				});
			});
		});	
	});
	
}
module.exports.sach = function(req, res){
	var tensach = req.cookies.tensach || '';
	sinhvienDB.danhMucSachTenSach(req.conn, [tensach],function(err1, result1){// Danh muc sach
		if(err1) throw err1;
		var mssv = req.cookies.mssv;
		sinhvienDB.getSinhVienMssv(req.conn, [mssv], function(err2, result2){ // Lay ve tai khoan sinh vien hien hanh
			if(err2) throw err2;
				sinhvienDB.phieuMuon(req.conn, [mssv], function(err3, result3){
					if(err3) throw err3;
					var phieumuon = [];
					for(var i = 0; i < result3[0].length ; i++){
						phieumuon.push(result3[0][i]);
					}
					sinhvienDB.getDanhSachDuyetMssv(req.conn, [mssv], function(err4, result4){
						if(err4) throw err4;
						sinhvienDB.sachDangMuon(req.conn, function(err5, result5){
							if(err5) throw err5;
							// Tao truong so luong sach dang muon cho danh muc sach
							var danhMucSach = result1;
							for(var i=0 ; i < danhMucSach.length ; i++){
								var temp = 0;
								for(var j=0; j<result5[0].length ; j++){
									if(danhMucSach[i].idsach == result5[0][j].idsach){
										danhMucSach[i].soluongMuon = result5[0][j].soluong;
										temp = 1;
										
										break;
									}
								}
								if(temp == 0) {
									danhMucSach[i].soluongMuon = 0;
								}
							}

							res.render('sinhvien/sach', {
								danhmucsach: danhMucSach,
								danhsachduyet: result4.length,
								phieumuon: phieumuon,
								pm_length: phieumuon.length,
								username: result2[0]
							});
						})
							
					});
					
				});
		});
		
	});
}

module.exports.lienhe = function(req, res){
	//res.sendfile('demo.html');
	var mssv = req.cookies.mssv;
	sinhvienDB.getSinhVienMssv(req.conn, [mssv], function(err1, result1){
		if(err1) throw err1;
		res.render('sinhvien/lienhe',{
			username: result1[0]
		});
	});
	
}

module.exports.timkiem = function(req, res){
	var tensach = req.params.tensach;
	if(tensach == '1') res.cookie('tensach', '');
	else
	res.cookie('tensach', tensach);
	res.redirect('/sinhvien/sach');

}

module.exports.muonsach = function(req, res){
	var mssv = req.cookies.mssv;
	sinhvienDB.getHotenMssv(req.conn, [mssv], function(err, results){
		if(err) throw err;
		res.render('sinhvien/muonsach',{
			username: results[0].hoten
		});
	});
}

module.exports.lichsu = function(req, res){
	var mssv = req.cookies.mssv;
	sinhvienDB.getHotenMssv(req.conn, mssv, function(err, results){
		if(err) throw err;
		res.render('sinhvien/lichsu', {
			username: results[0].hoten
		});
	});
	
}

module.exports.addPhieuMuon = function(req, res){
	var mssv = req.cookies.mssv;
	var idsach = req.params.idsach;
	var sql = 'insert into giohang_muonsach(mssv, idsach) value(?, ?)';
	connection.query(sql,[mssv, idsach], function(err){
		if(err) throw err;
		console.log(' 1 record inserted.')
	});
	res.redirect('/sinhvien/sach');
}

module.exports.deleteGioHang = function(req, res){
	var mssv = req.cookies.mssv;
	var idgiohang = req.params.idgiohang;
	var sql = 'delete from giohang_muonsach where mssv = ? and idgiohang = ?';
	connection.query(sql, [mssv, idgiohang], function(err){
		if(err) throw err;
	});
}

module.exports.addDanhSachDuyet = function(req, res){
	var mssv = req.cookies.mssv;
	var sql_sv = 'select * from sinhvien where mssv = ?';
	connection.query(sql_sv, [mssv], function(err, results){
		if(err) throw err;
		var mssv = results[0].mssv;
		var hoten = results[0].hoten;
		var email = results[0].email;
		let sql = 'insert into danhsachduyet(mssv, hoten, email) value (?, ?, ?)';
		connection.query(sql, [mssv, hoten, email], function(error){
			if(error) throw error;
		});
	});
	res.redirect('/sinhvien/sach');
}

module.exports.xoaDanhSachDuyet = function(req, res){
	var mssv = req.cookies.mssv;
	var sql = 'delete from danhsachduyet where mssv = ?';
	connection.query(sql, [mssv], function(err){
		if(err) throw err;
	});
	res.redirect('/sinhvien/sach');
}
