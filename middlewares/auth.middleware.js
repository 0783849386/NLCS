const conn = require('../dbmysql/db.mysql');

module.exports.requireAuth = function(req, res, next){
	if(!req.cookies.username){
		res.redirect('/auth/login');
		return;
	}
	var sql = 'select * from quanlithuvien where tenQL = ?';
	conn.query(sql,[req.cookies.username], function(err, results){
		if(err) throw err;
		if(results.length === 0){
			res.redirect('/auth/login');
			return;
		}
		next();
	});
}
module.exports.requireSinhVien = function(req, res, next){
	if(!req.cookies.mssv){
		res.redirect('/auth/login');
		return;
	}
	var sql = 'select * from sinhvien where mssv = ?';
	conn.query(sql,[req.cookies.mssv], function(err, results){
		if(err) throw err;
		if(results.length === 0){
			res.redirect('/auth/login');
			return;
		}
		next();
	});
}