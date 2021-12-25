const sinhvienDB = require('../models/sinhvien.model');
const quanliDB = require('../models/quanli.model');

module.exports.phieuMuon = function(req, res){
	let mssv = req.cookies.mssv;
	sinhvienDB.phieuMuon(req.conn, [mssv], function(err, results){
		let phieuMuon = JSON.stringify(results[0]);
			res.end(phieuMuon);
	})
}

module.exports.danhMucSach = function(req, res){
	sinhvienDB.danhMucSach(req.conn, function(err1, results1){
		if(err1) throw err1;
		quanliDB.sachDangMuon(req.conn, function(err2, results2){
			if(err2) throw err2;
			let danhMucSach = results1;
			for(var i=0 ; i<danhMucSach.length ; i++){
				var temp = 0
				for(var j = 0 ; j<results2[0].length ; j++){
					if(danhMucSach[i].idsach == results2[0][j].idsach){
						danhMucSach[i].soluongMuon = results2[0][j].soluong;
						temp = 1;
						break;
					}
				}
				if(temp == 0) danhMucSach[i].soluongMuon = 0;
			}

		let result	= JSON.stringify(danhMucSach);
		res.end(result);
		})

	})
}

module.exports.timKiemSach = function(req, res){
	let tensach = req.params.tensach;
	sinhvienDB.timKiemSach(req.conn, [tensach], function(err1, results1){
		if(err1) throw err1;
		quanliDB.sachDangMuon(req.conn, function(err2, results2){
			if(err2) throw err2;
			let danhMucSach = results1;
			for(var i=0 ; i<danhMucSach.length ; i++){
				var temp = 0
				for(var j = 0 ; j<results2[0].length ; j++){
					if(danhMucSach[i].idsach == results2[0][j].idsach){
						danhMucSach[i].soluongMuon = results2[0][j].soluong;
						temp = 1;
						break;
					}
				}
				if(temp == 0) danhMucSach[i].soluongMuon = 0;
			}

		let result	= JSON.stringify(danhMucSach);
		res.end(result);
		})
		
	})
}