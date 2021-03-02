var connection = require('../dbmysql/db.mysql');

module.exports.show = function(req, res){
	var sql = 'select * from danhmucsach';
	connection.query(sql, function(err, results){
		if(err) throw err;
		res.render('quanli/sach', {
			danhmucsach: results,
			username: req.cookies.username
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
	var sql = 'insert into danhmucsach (tensach,tacgia,soluong) value (?, ?, ?)';
	connection.query(sql, [tensach, tacgia, soluong], function(err, results){
		if(err) throw err;
		console.log('1 record inserted.');
	});
	res.redirect('/sach/show');
}

module.exports.updateSach = function(req, res){
	let idsach = req.body.idsachUp;
	let tensach = req.body.tensachUp;
	let tacgia = req.body.tacgiaUp;
	let soluong = req.body.soluongUp;
	var sql = 'update danhmucsach set tensach = ?, tacgia = ?, soluong = ? where idsach = ?';
	connection.query(sql, [tensach, tacgia, soluong, idsach], function(err){
		if(err) throw err;
	});
	res.redirect('/sach/show');
}