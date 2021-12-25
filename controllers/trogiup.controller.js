const connection = require('../dbmysql/db.mysql');
const sinhvienDB = require('../models/sinhvien.model');


module.exports.thutuc = function(req, res){
	var mssv = req.cookies.mssv;
	sinhvienDB.getSinhVienMssv(req.conn, [mssv], function(err1, result1){
		if(err1) throw err1;
		res.render('trogiup/thutuc',{
			username: result1[0]
		});
	});
}
module.exports.muonsach = function(req, res){
	var mssv = req.cookies.mssv;
	sinhvienDB.getSinhVienMssv(req.conn, [mssv], function(err1, result1){
		if(err1) throw err1;
		res.render('trogiup/muonsach',{
			username: result1[0]
		});
	});
}
module.exports.quydinh = function(req, res){
	var mssv = req.cookies.mssv;
	sinhvienDB.getSinhVienMssv(req.conn, [mssv], function(err1, result1){
		if(err1) throw err1;
		res.render('trogiup/quydinh',{
			username: result1[0]
		});
	});
}
module.exports.lich = function(req, res){
	var mssv = req.cookies.mssv;
	sinhvienDB.getSinhVienMssv(req.conn, [mssv], function(err1, result1){
		if(err1) throw err1;
		res.render('trogiup/lich',{
			username: result1[0]
		});
	});
}
module.exports.noiquy = function(req, res){
	var mssv = req.cookies.mssv;
	sinhvienDB.getSinhVienMssv(req.conn, [mssv], function(err1, result1){
		if(err1) throw err1;
		res.render('trogiup/noiquy',{
			username: result1[0]
		});
	});
}