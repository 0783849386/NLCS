
module.exports.phieuMuon =   function(conn, mssv, callback){
	var sql = 'call phieumuon(?)';
	conn.query(sql, mssv, callback);
}

module.exports.danhMucSach = function(conn, callback){
	var sql = 'select * from danhmucsach';
	conn.query(sql, callback);
}
// truy vấn theo tên sách
module.exports.danhMucSachTenSach = function(conn, tensach, callback){
	var sql = 'select * from danhmucsach where tensach like "%'+tensach+'%"';
	conn.query(sql, tensach, callback);
}
module.exports.timKiemSach = function(conn, tensach, callback){
	var sql = 'select * from danhmucsach where tensach like "%'+tensach+'%"';
	conn.query(sql, tensach, callback);
}

module.exports.sachDangMuon = function(conn, callback){
	var sql = 'call sachdangmuon';
	conn.query(sql, callback);
}
// Auth quanli
module.exports.quanLiThuVien = function(conn, tenQL, callback){
	var sql = 'select * from quanlithuvien where tenQL = ?';
	conn.query(sql, tenQL, callback);
}

// insert into DanhMucSach 
module.exports.createDanhMucSach = function(conn, tensach, tacgia, soluong, callback){
	var sql = 'insert into danhmucsach (tensach,tacgia,soluong) value (?, ?, ?)';
	conn.query(sql, tensach, tacgia, soluong, callback);
}
// insert có hình ảnh
module.exports.createDanhMucSachImg = function(conn, tensach,hinhanh, tacgia, soluong, callback){
	var sql = 'insert into danhmucsach (tensach,tacgia,hinhanh,soluong) value (?, ?, ?, ?)';
	conn.query(sql, tensach, tacgia, hinhanh, soluong, callback);
}
//updata DanhMucSach
module.exports.updateDanhMucSach = function(conn, tensach, tacgia, soluong, idsach, callback){
	var sql = 'update danhmucsach set tensach = ?, tacgia = ?, soluong = ? where idsach = ?';
	conn.query(sql, tensach, tacgia, soluong, idsach, callback);
}
// update DanhMucSach có hình ảnh
module.exports.updateDanhMucSachImg = function(conn, tensach, tacgia, hinhanh, soluong, idsach, callback){
	var sql = 'update danhmucsach set tensach = ?, tacgia = ?, hinhanh = ?, soluong = ? where idsach = ?';
	conn.query(sql, tensach, tacgia, hinhanh, soluong, idsach, callback);
}