let thongtin = document.getElementById('thongtin');
let thongtinMssv = document.getElementById('thongtin-mssv');
let displayMssv = document.getElementById('display-mssv');
let btnSV = document.getElementById('btn-sv');
let btnSach = document.getElementById('btn-s');
let muonsach1 = document.getElementById('muonsach1');
let muonsach2 = document.getElementById('muonsach2');
let addBtn = document.querySelectorAll('#add');
let btnPhieuMuon = document.querySelectorAll('#phieumuon');
let btnTimKiem = document.getElementById('btn-timkiem');
let contentTimKiem = document.getElementById('timkiem-content');
let xacnhan = document.getElementById('xacnhan');



function clickButtonAdd(){
	for(var i=0;i<addBtn.length;i++){
		addBtn[i].addEventListener('click', themSach);
	}
}
function clickButtonXoa(){
	for(var i=0;i<btnPhieuMuon.length;i++){
		btnPhieuMuon[i].addEventListener('click', xoaPhieuMuon);
	}
}

function xoaPhieuMuon(){
      var button = event.target;
      var idgiohang = button.dataset.idgiohang;
      location.reload();
      axios.delete('http://localhost:3000/quanli/deleteGioHang/'+idgiohang, {}).then(function(res){
      });	
}

function themSach(){
	let button = event.target;
	if(btnPhieuMuon.length >= 5){
       option = confirm('Bạn chỉ có thể thêm vào phiếu 5 quyển sách.');
    }
    else {
		if(!displayMssv){
			option = confirm('Cần thông tin sinh viên.');
    		thongtinSinhVien();
		}
    	 else{	
            var idsach = button.dataset.idsach;
            axios.post('http://localhost:3000/quanli/addPhieuMuon/'+idsach, {}).then(function(res){
                  location.reload();
            });           
      	}
      }
}
async function loadThongTinSinhVien(){
	var mssv = thongtinMssv.value;
	if(mssv){
		console.log(mssv);
	axios.get('http://localhost:3000/quanli/loadSinhVien/'+mssv,).then(function(res){
		location.reload();
      });
	}else{
		option=confirm('Nhập vào mã số sinh viên.');
	}

}

function thongtinSinhVien(){
	muonsach1.style.display = 'block';
	muonsach2.style.display = 'none';
	btnSV.style.backgroundColor = 'rgb(23, 162, 184)';
	btnSach.style.backgroundColor = '';
}

function danhsach(){
	muonsach2.style.display = 'block';
	muonsach1.style.display = 'none';
	btnSV.style.backgroundColor = '';
	btnSach.style.backgroundColor = 'rgb(23, 162, 184)';
}

async function timkiem(){
	var tensach = contentTimKiem.value || '1';

     await axios.get('http://localhost:3000/quanli/timkiem/'+tensach,).then(function(res){
     	location.reload();
      });
       
}

function xacNhanMuonSach(){
	if(btnPhieuMuon.length != 0){
		option = confirm('Đã xác nhận.');
	  	axios.get('http://localhost:3000/quanli/xacnhan',).then(function(res){
	   		location.reload();
	     });		
	  }else{
	  	option = confirm('Cần thêm ít nhất một quyển sách.')
	  }
        
}


function main(){
	thongtin.addEventListener('click', loadThongTinSinhVien);
	btnSV.addEventListener('click', thongtinSinhVien);
	btnSach.addEventListener('click', danhsach);
	clickButtonAdd();
	clickButtonXoa();
	thongtinSinhVien();
	var cookie = document.cookie;
	let position = cookie.indexOf('addDelete');
	if(position != -1){
		danhsach();
	}
	position = cookie.indexOf('mssv');
	if(position != -1){
		let count = 0;
		for(var i = position ; i<cookie.length ; i++){
			if(cookie[i] == ';'){
				thongtinMssv.value = cookie.slice((position+5), i);
				count = 1;
				break;
			}
		}
		if(!count) 	thongtinMssv.value = cookie.slice((position+5), cookie.length);
	}
	btnTimKiem.addEventListener('click', timkiem);
	xacnhan.addEventListener('click', xacNhanMuonSach);
}
main();