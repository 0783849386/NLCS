let navLichsu = document.getElementById('nav-lichsu');
let lichSu = document.querySelectorAll('.noidung-lichsu');

// Khai bao obj sinh vien de quan ly document
function objSinhVien(idsach, mssv, muon, tra){
	var sinhvien = {};
		sinhvien.idsach = idsach;
		sinhvien.mssv = mssv;
		sinhvien.muon = muon;
		sinhvien.tra = tra;
	return sinhvien;
}


// Thành viên chưa trả sách
function dangMuonSach(){
	var listColor = []; // Khai  báo mảng đối tượng
	// Khai bao array theo sinh vien
	for(var i = lichSu.length-1; i>=0 ; i--){
		var temp = 0
		var mssv = lichSu[i].dataset.mssv;
		var idsach = lichSu[i].dataset.idsach;
		var hoatdong = lichSu[i].dataset.hoatdong;
		for(var j=0 ;j<listColor.length ; j++){
			if(mssv == listColor[j].mssv && idsach == listColor[j].idsach){
				temp = 1;
				if(hoatdong == 'Mượn sách') listColor[j].muon++;
				if(hoatdong == 'Trả sách') listColor[j].tra++;
			}
			
		}
		if(temp == 0 && hoatdong == 'Mượn sách') listColor.push(objSinhVien(idsach, mssv, 1, 0));
	}
 	// Tô màu nhưng sinh viên mượn sách chưa trả
 	for( var i = 0 ; i<lichSu.length ; i ++){
 		var mssv = lichSu[i].dataset.mssv;
		var idsach = lichSu[i].dataset.idsach;
		var hoatdong = lichSu[i].dataset.hoatdong;
 		for(var j=0 ; j <listColor.length ; j++){
 			if(mssv === listColor[j].mssv && idsach === listColor[j].idsach && hoatdong == 'Mượn sách' && (listColor[j].muon > listColor[j].tra)){
 				lichSu[i].style.color = 'red';
 				listColor[j].muon--;
 			}
 		}
 	}

}


function main(){
	navLichsu.style.backgroundColor = '#eee';
	dangMuonSach();
}

main();