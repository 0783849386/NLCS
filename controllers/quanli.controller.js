var connection = require('../dbmysql/db.mysql');
const quanliDB = require('../models/quanli.model');

module.exports.home = function(req, res){
	var sql_duyet = 'select * from danhsachduyet';
	connection.query(sql_duyet, function(err, result_duyet){
		if(err) throw err;
		var danhsach = [];
		for(var i=0 ; i<result_duyet.length;i++){
			danhsach[i] = result_duyet[i];
			danhsach[i].mssv = result_duyet[i].mssv.toLowerCase();
		}
		var sql_muonsach = 'call thanhvienmuonsach';
		connection.query(sql_muonsach, function(error, result_thanhvien){
			if(error) throw error;
			var thanhvien = [];
			for(var i=0; i<result_thanhvien[0].length; i++){
				thanhvien[i] = result_thanhvien[0][i];
				thanhvien[i].mssv = result_thanhvien[0][i].mssv.toLowerCase();
			}
			var sql_chitiet_giohang = 'call chitiet_giohang';
			connection.query(sql_chitiet_giohang, function(err3, result_chitiet_giohang){
				if(err3) throw err3;
				var chitiet_giohang = []
				for(var i = 0 ; i < result_chitiet_giohang[0].length; i++){
					chitiet_giohang[i] = result_chitiet_giohang[0][i];
					chitiet_giohang[i].mssv = result_chitiet_giohang[0][i].mssv.toLowerCase();
				}
				var sql_chitiet_muonsach = 'call chitiet_muonsach';
				connection.query(sql_chitiet_muonsach, function(err4, result_chitiet_muonsach){
					if(err4) throw err4;
					var chitietmuonsach = [];
					for(var i=0 ; i<result_chitiet_muonsach[0].length ; i++){
						chitietmuonsach[i] = result_chitiet_muonsach[0][i];
						chitietmuonsach[i].mssv = result_chitiet_muonsach[0][i].mssv.toLowerCase();
					}
					res.render('quanli/home',{
						username: req.cookies.username,
						danhsachduyet: result_duyet,
						thanhvienmuonsach: thanhvien,
						chitiet_giohang: chitiet_giohang,
						chitiet_muonsach: chitietmuonsach
					});	
				});
			
			});

		});
	});
}
module.exports.sinhvien = function(req, res){
	var mssv = req.cookies.thanhvien || '';
	var sql = 'select * from sinhvien where mssv like "%'+mssv+'%"';
	connection.query(sql, function(err, results){
		if(err) throw err;
		res.render('quanli/sinhvien',{
			sinhvien: results,
			username: req.cookies.username
		});
	})
}

module.exports.muonsach = function(req, res){
	var tensach = req.cookies.tensach || '';
	var mssv = req.cookies.mssv;
	quanliDB.danhMucSach(req.conn, function(err1, result1){
		if(err1) throw err1;
		quanliDB.sachDangMuon(req.conn, function(err4, result4){
			if(err4) throw err4;
			// Tao truong so luong sach dang muon cho danh muc sach
			var danhMucSach = result1;
			for(var i=0 ; i < danhMucSach.length ; i++){
				var temp = 0;
				for(var j=0; j<result4[0].length ; j++){
					if(danhMucSach[i].idsach == result4[0][j].idsach){
						danhMucSach[i].soluongMuon = result4[0][j].soluong;
						temp = 1;
						
						break;
					}
				}
				if(temp == 0) {
					danhMucSach[i].soluongMuon = 0;
				}
			}
			if(mssv){
				var sql_sv = 'select * from sinhvien where mssv = ?';
				connection.query(sql_sv, [mssv], function(err2, result_sv){
					if(err2) throw err2;
					var sql_phieu = 'call phieumuon(?)';
					connection.query(sql_phieu, [mssv], function(err3, result_pm){
						if(err3) throw err3;
							res.render('quanli/muonsach', {
								danhmucsach: danhMucSach,
								sv_length: result_sv.length,
								sinhvien: result_sv[0],
								phieumuon: result_pm[0],
								pm_length: result_pm[0].length,
								username: req.cookies.username,
								addDelete: req.cookies.addDelete
							});
						})
						
					});
				
			}
			else{
				res.render('quanli/muonsach', {
					danhmucsach: danhMucSach,
					username: req.cookies.username
				});
			}	
		});
		
	});
}
module.exports.duyet = function(req, res){
	var mssv = req.params.mssv;
	var today = new Date();
		today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+'-'+today.getMinutes()+'-'+today.getSeconds();
	var sql_gh = 'call phieumuon(?)';
	connection.query(sql_gh, [mssv], function(err1, result_pm){
		if(err1) throw err1;
		for(var i=0 ; i < result_pm[0].length ; i++){
			var idsach = result_pm[0][i].idsach;
			var sql_muonsach = 'insert into muonsach(mssv, idsach, ngaymuon) value(?, ?, ?)';
			connection.query(sql_muonsach, [mssv, idsach, today], function(err2){
				if(err2) throw err2;
			});
			let sql_lichsu = 'insert into  lichsu(mssv, idsach, ngay, hoatdong) value(?, ?, ? ,?)';
			connection.query(sql_lichsu, [mssv, idsach, today, 'Mượn sách'], function(err){
				if(err) throw err;
			});
		}
		var sql_delete_gh = 'delete from giohang_muonsach  where mssv = ?';
		connection.query(sql_delete_gh, [mssv], function(err3){
			if(err3) throw err3;
		});
		var sql_duyet = 'delete from danhsachduyet where mssv = ?';
		connection.query(sql_duyet, [mssv], function(err4){
			if(err4) throw err4;
		});
	});
	res.redirect('/quanli/home');
}

module.exports.nhanSach = function(req, res){
	let idmuon = req.params.idmuon;
	let today = new Date();
		today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+'-'+today.getMinutes()+'-'+today.getSeconds();
	let sql = 'update muonsach set ngaytra = ? where idmuon = ?';
	connection.query(sql, [today, idmuon], function(err1){
		if(err1) throw err1;
	});
	let sql_muon = 'select * from muonsach where idmuon = ?';
	connection.query(sql_muon, [idmuon], function(err2, result_ms){
		if(err2) throw err2;
		let sql_lichsu = 'insert into  lichsu (mssv, idsach, ngay, hoatdong) value(?, ?, ? ,?)';
		connection.query(sql_lichsu, [result_ms[0].mssv, result_ms[0].idsach, today, 'Trả sách'], function(err3){
			if(err3) throw err3;
		});
	});
	var sql_mssv = 'select * from muonsach where idmuon = ?';
	connection.query(sql_mssv, [idmuon], function(err4, result4){
		if(err4) throw err4;
		var mssv = result4[0].mssv;
		var sql = 'call sachsinhviendangmuon(?)';
		connection.query(sql, [mssv], function(err, results){
			if(err) throw err;
			var chiTietMuon = JSON.stringify(results[0]);
			res.end(chiTietMuon);
		});
		
	});
}

module.exports.updateSinhVien = function(req, res){
	let mssv = req.body.mssv;
	let hoten = req.body.hoten;
	let email = req.body.email;
	var sql = 'update sinhvien set hoten = ?, email = ? where mssv = ?';
	connection.query(sql, [hoten, email, mssv], function(err){
		if(err) throw err;
	});
	res.redirect('/quanli/sinhvien');
}

module.exports.loadSinhVien = function(req, res){
	let mssv = req.params.mssv;
	if(req.cookies.addDelete){
		res.clearCookie("addDelete");
	}
	res.cookie('mssv', mssv);
	res.redirect('/quanli/muonsach');
}

module.exports.addPhieuMuon = function(req, res){
	var mssv = req.cookies.mssv;
	var idsach = req.params.idsach;
	var sql = 'insert into giohang_muonsach(mssv, idsach) value(?, ?)';
	connection.query(sql,[mssv, idsach], function(err){
		if(err) throw err;
		console.log(' 1 record inserted.')
	});
	res.cookie('addDelete', 1);
	res.redirect('/quanli/muonsach');
}

module.exports.deleteGioHang = function(req, res){
	var mssv = req.cookies.mssv;
	var idgiohang = req.params.idgiohang;
	var sql = 'delete from giohang_muonsach where mssv = ? and idgiohang = ?';
	connection.query(sql, [mssv, idgiohang], function(err){
		if(err) throw err;
	});
}
module.exports.timkiem = function(req, res){
	var tensach = req.params.tensach;
	if(tensach == '1') res.cookie('tensach', '');
	else
	res.cookie('tensach', tensach);
	res.redirect('/quanli/muonsach');

}
module.exports.timkiemLichSu = function(req, res){
	var mssv = req.body.timkiem;
	res.cookie('lichsu', mssv);
	res.redirect('/quanli/lichsu');

}
module.exports.timkiemSinhVien = function(req, res){
	var mssv = req.body.timkiem;
	res.cookie('thanhvien', mssv);
	res.redirect('/quanli/sinhvien');

}
module.exports.xacnhan = function(req, res){
	var mssv = req.cookies.mssv;
	var today = new Date();
		today = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+'-'+today.getMinutes()+'-'+today.getSeconds();
	var sql_gh = 'call phieumuon(?)';
	connection.query(sql_gh, [mssv], function(err1, result_pm){
		if(err1) throw err1;
		for(var i=0 ; i < result_pm[0].length ; i++){
			var idsach = result_pm[0][i].idsach;
			var sql_muonsach = 'insert into muonsach(mssv, idsach, ngaymuon) value(?, ?, ?)';
			connection.query(sql_muonsach, [mssv, idsach, today], function(err2){
				if(err2) throw err2;
			});
			let sql_lichsu = 'insert into  lichsu(mssv, idsach, ngay, hoatdong) value(?, ?, ? ,?)';
			connection.query(sql_lichsu, [mssv, idsach, today, 'Mượn sách'], function(err){
				if(err) throw err;
			});
		}
		var sql_delete_gh = 'delete from giohang_muonsach  where mssv = ?';
		connection.query(sql_delete_gh, [mssv], function(err3){
			if(err3) throw err3;
		});
		var sql_duyet = 'delete from danhsachduyet where mssv = ?';
		connection.query(sql_duyet, [mssv], function(err4){
			if(err4) throw err4;
		});
	});
	res.clearCookie('addDelete');
	res.clearCookie('mssv');
	res.redirect('/quanli/muonsach')
}

module.exports.lichsu = function(req, res){
	var mssv = req.cookies.lichsu || '';
	var sql =  'call lichsugiaodich(?)';
	connection.query(sql, [mssv],function(err, results){
		if(err) throw err;
		res.render('quanli/lichsu',{
			lichsu: results[0],
			username: req.cookies.username
		});
	});
	
}

module.exports.chiTietMuon = function(req, res){
	var mssv = req.params.mssv;
	var sql = 'call sachsinhviendangmuon(?)';
	connection.query(sql, [mssv], function(err, results){
		if(err) throw err;
		var chiTietMuon = JSON.stringify(results[0]);
		res.end(chiTietMuon);
	});
}

module.exports.homeChiTietNhan = function(req, res){
	var mssv = req.params.mssv;
}