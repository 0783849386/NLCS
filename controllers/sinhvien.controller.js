var connection = require('../dbmysql/db.mysql');

module.exports.home = function(req, res){
	var mssv = req.cookies.mssv;
	var sql = 'select hoten from sinhvien where mssv  = ?';
	connection.query(sql, [mssv], function(err, results){
		if(err) throw err;
		var sql_lichsu = 'call lichsusinhvien(?)';
		connection.query(sql_lichsu, [mssv], function(err1, result_ls){
			if(err1) throw err1;
			var sql_danhsach = 'call sachsinhviendangmuon(?)';
			connection.query(sql_danhsach, [mssv], function(err2, result_ds){
				if(err2) throw err2;
				res.render('sinhvien/home_sinhvien',{
					username: results[0].hoten,
					lichsu: result_ls[0],
					danhsach: result_ds[0]
				});
			});
		});	
	});
	
}

module.exports.sach = function(req, res){
	var tensach = req.cookies.tensach || '';
	var sql = 'select * from danhmucsach where tensach like "%'+tensach+'%"';
	connection.query(sql, function(err, results){
		if(err) throw err;
		var mssv = req.cookies.mssv;
		var sql_sv = 'select hoten from sinhvien where mssv  = ?';
		connection.query(sql_sv, [mssv], function(err, results_sv){
			if(err) throw err;
				var sql_pm = 'call phieumuon( ?)';
				connection.query(sql_pm, [mssv], function(e, row_pm){
					if(e) throw e;
					var phieumuon = [];
					for(var i = 0; i < row_pm[0].length ; i++){
						phieumuon.push(row_pm[0][i]);
					}
					var sql_ds_duyet = 'select * from danhsachduyet where mssv = ?';
					connection.query(sql_ds_duyet, [mssv], function(err4, result4){
						if(err4) throw err4;
							res.render('sinhvien/sach', {
							danhmucsach: results,
							danhsachduyet: result4.length,
							phieumuon: phieumuon,
							pm_length: phieumuon.length,
							username: results_sv[0].hoten
						});
					});
					
				});
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
	var sql_sv = 'select hoten from sinhvien where mssv  = ?';
	connection.query(sql_sv, [mssv], function(err, results){
		if(err) throw err;
		res.render('sinhvien/muonsach',{
			username: results[0].hoten
		});
	});
}

module.exports.lichsu = function(req, res){
	var mssv = req.cookies.mssv;
	var sql_sv = 'select hoten from sinhvien where mssv  = ?';
	connection.query(sql_sv, [mssv], function(err, results){
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
