const conn = require('../dbmysql/db.mysql');
const quanliDB = require('../models/quanli.model');

module.exports.requireAuth = function(req, res, next){
	if(!req.cookies.username){
		res.redirect('/auth/login');
		return;
	}
	quanliDB.quanLiThuVien(req.conn,[req.cookies.username], function(err, results){
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