// get Sinh Vien
module.exports.getSinhVienMssv = function(conn,mssv, callback){
	var sql= 'select * from sinhvien where mssv  = ?';
	conn.query(sql, mssv, callback);
}
// get DanhSachDuyet theo mssv
module.exports.getDanhSachDuyetMssv = function(conn, mssv, callback){
	var sql = 'select * from danhsachduyet where mssv = ?';
	conn.query(sql, mssv, callback);
}

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
// lay ho ten tu mssv
module.exports.getHotenMssv = function(conn, mssv, callback){
	var sql = 'select hoten from sinhvien where mssv  = ?';
	conn.query(sql, mssv, callback);
}