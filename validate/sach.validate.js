const connection = require('../dbmysql/db.mysql');

module.exports.postCreate = function(req, res, next){
	var errTenSach = [];
	if(!req.body.tensach){
		errTenSach.push("Tên sách còn trống!");
	}
	var errTacGia = [];
	if(!req.body.tacgia){
		errTacGia.push("Tác giả còn trống!");
	}
	var errSoLuong = [];
	if(!req.body.soluong){
		errSoLuong.push("Số lượng còn trống!");
	}
	if(errTenSach.length || errTacGia.length || errSoLuong.length){
		var sql = 'select * from danhmucsach';
		connection.query(sql, function(err, results){
			if(err) throw err;
			res.render('quanli/sach', {
				danhmucsach: results,
				username: req.cookies.username,
				errTenSach: errTenSach,
				errTacGia: errTacGia,
				errSoLuong: errSoLuong,
				values: req.body
			});
		});
		return;
	}
	next();
}