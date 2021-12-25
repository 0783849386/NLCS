let ct_giohang = document.querySelectorAll('#chitietgiohang');
let ct_muonsach = document.querySelectorAll('#chitietmuonsach');
var modal  = document.querySelectorAll('.modal');
var modal2  = document.querySelector('.modal2');
let duyetId = document.querySelectorAll('#duyetmuonsach');
let home1 = document.getElementById('contentHome1');
let home2 = document.getElementById('contentHome2');
let btnHome1 = document.getElementById('btn-home1');
let btnHome2 = document.getElementById('btn-home2');
let chiTietMuon = document.getElementById('chitiet-muon');
let navHome = document.getElementById('nav-home');

window.onclick = function(event) {
	for(var i=0; i<modal.length ; i++){
		if (event.target == modal[i]) {
        	modal[i].style.display = "none";
    	}
	}

}
function clickButtonChiTietGH(){
	for(var i = 0 ; i < ct_giohang.length ; i++){
		ct_giohang[i].addEventListener('click', showChiTiet);
	}
}

function clickButtonChiTietMS(){
	for(var i = 0 ; i < ct_muonsach.length ; i++){
		ct_muonsach[i].addEventListener('click', xuLyChiTiet);
	}
}

function clickButtonDuyet(){
	for(var i=0 ; i < duyetId.length ; i++){
		duyetId[i].addEventListener('click', duyetMuonSach);
	}
}

function clickButtonNhan(){
	let btnNhan = document.querySelectorAll('.btn-nhan');
	for(var i=0 ; i<btnNhan.length ; i++){
		btnNhan[i].addEventListener('click', nhanSach);
	}
}

function nhanSach(){
	let button = event.target;
	let idmuon = button.dataset.idmuon;
	let stt = button.dataset.stt;
	axios.post('http://localhost:3000/quanli/nhanSach/'+idmuon,).then(function(res){
		showListSachMuon(res.data);
    });
}

function duyetMuonSach(){
	let button = event.target;
	var mssv = button.dataset.mssv;
   	axios.get('http://localhost:3000/quanli/duyet/'+mssv,).then(function(res){
   		location.reload();
     });       
}

function showChiTiet(){
	var button = event.target;
    var id = button.dataset.id - 2;
	modal[id].style.display='block';
}
function xuLyChiTiet(){
	var button = event.target;
    var mssv = button.dataset.mssv;
   axios.get('http://localhost:3000/quanli/chiTietMuon/'+mssv,).then(function(res){
   		var sachMuonCuaSinhVien = res.data;
   		showListSachMuon(sachMuonCuaSinhVien);
		
     });  
	modal2.style.display='block';
}
function showListSachMuon(items){
	var headerTable1 = '<table class="table table-bordered">'
								+   '<tr>'
								+     '<th>STT</th>'
								+     '<th>Tên sách</th>'
								+     '<th>Tác giả</th>'
								+     '<th>Nhận sách</th>'
								+     '</tr>';
		var headerTable2 ='';
   		for(var i=0; i<items.length ; i++){
   			headerTable2 += "<tr><td>"+(i+1)+"</td>"
   										+"<td>"+items[i].tensach+"</td>"
   										+"<td>"+items[i].tacgia+"</td>"
   										+"<td><button class='btn btn-nhan' data-idmuon='"+items[i].idmuon+"''> Nhận </button></td>"
   										+"</tr>";
   		}
   		chiTietMuon.innerHTML = headerTable1 + headerTable2;
   		clickButtonNhan();
}
function contentHome1(){
	home1.style.display = "block";
	home2.style.display = "none";
	btnHome1.style.backgroundColor= '#17a2b8';
	btnHome2.style.backgroundColor= '';
	window.onclick = function(event) {
	for(var i=0; i<modal.length ; i++){
		if (event.target == modal[i]) {
        	modal[i].style.display = "none";
    	}
	}

}
}

function contentHome2(){
	home2.style.display = "block";
	home1.style.display = "none";
	btnHome2.style.backgroundColor= '#17a2b8';
	btnHome1.style.backgroundColor= '';
	window.onclick = function(event) {
		if (event.target == modal2) {
        	modal2.style.display = "none";
    	}
	}
}


function main(){
	clickButtonChiTietGH();
	clickButtonChiTietMS();
	clickButtonDuyet();
	btnHome1.addEventListener('click', contentHome1);
	btnHome1.style.backgroundColor= '#17a2b8';
	btnHome2.addEventListener('click', contentHome2);
	navHome.style.backgroundColor = '#eee';
}
main();