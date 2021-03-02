var connection = require('../dbmysql/db.mysql');

module.exports.index = function(req, res){
	//res.redirect("/demo");
	res.clearCookie('mssv');
	res.render('auth/login');
}
 module.exports.postLogin = function(req, res){
 	var email = req.body.email;
 	var pass = req.body.pass;

 	var sql_ql = "select * from quanlithuvien where emailQL = ?";
 	connection.query(sql_ql, [req.body.email], function(err, results_ql, fileds){
 		if(err) throw err;
 		//console.log(results);
		var quanli = results_ql;
	 	if(quanli.length == 0){
	 		var sql_sv = "select * from sinhvien where email = ?";
	 		connection.query(sql_sv, [req.body.email], function(err, results_sv){
	 			if(err) throw err;
	 			var sinhvien = results_sv;
	 			if(sinhvien.length == 0){
	 				res.render('auth/login', {
			 			errors: [
			 				'Users does not exits.'
			 			],
			 			values: req.body
	 				});
	 				return;
	 			}
	 			if(sinhvien[0].pass !== pass){
			 		res.render('auth/login', {
			 			errors: [
			 				'Wrong password.'
			 			],
			 			values: req.body
			 		});
			 		return;
			 	}
			 	var mssv = sinhvien[0].mssv;
			 	res.cookie('mssv', mssv);
			 	res.redirect('/sinhvien/home');
			 	return;
	 		});
	 	}
	 	else{
	 		if(quanli[0].passQL !== pass){
		 		res.render('auth/login', {
		 			errors: [
		 				'Wrong password.'
		 			],
		 			values: req.body
		 		});
		 		return;
		 	}
		 	var ten = quanli[0].TenQL;
		 	res.cookie('username', ten);
		 	res.redirect('/quanli/home');
	 	}
		 	
 	});
 }

 module.exports.register = function(req, res){
 	res.render('auth/register');
 }

 module.exports.postRegister = function(req, res){
 	var mssv = req.body.mssv;
 	var hoten = req.body.hoten;
 	var email = req.body.email;
 	var pass = req.body.pass;
 	var sql = 'insert into sinhvien(mssv, hoten, email, pass) value (?, ?, ?, ?)';
 	connection.query(sql, [mssv, hoten, email, pass], function(err){
 		if(err) throw err;
 		console.log('1 record inseted.')
 	});
 	res.render('auth/register', {
 		results: ['Đăng ký thành công!']
 	});
 }