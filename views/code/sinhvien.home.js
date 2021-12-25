let sachmuon = document.getElementById('sachmuon');
let lichsu = document.getElementById('lichsu');
let danhSach = document.getElementById('display-sachmuon');
let thoiGianMuon = document.getElementById('display-lichsu');
let navHome = document.getElementById('nav-home');

function contentHome1(){
	danhSach.style.display = "block";
	thoiGianMuon.style.display = "none";
	sachmuon.style.backgroundColor= '#17a2b8';
	lichsu.style.backgroundColor= '';
}

function contentHome2(){
	thoiGianMuon.style.display = "block";
	danhSach.style.display = "none";
	lichsu.style.backgroundColor= '#17a2b8';
	sachmuon.style.backgroundColor= '';
}
function main(){
	sachmuon.addEventListener('click', contentHome1);
	lichsu.addEventListener('click', contentHome2);
	sachmuon.style.backgroundColor= '#17a2b8';
	thoiGianMuon.style.display = "none";
	navHome.style.backgroundColor = '#eee';
}
main();