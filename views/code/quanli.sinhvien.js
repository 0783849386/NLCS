let modal  = document.querySelector('.modal');
var edit  = document.querySelectorAll('#editSinhVien');
let hotenIp = document.getElementById('hoten');
let emailIp = document.getElementById('email');
let mssvIp = document.getElementById('mssv');
let navThanhVien = document.getElementById('nav-thanhvien');

window.onclick = function(event) {
	if (event.target == modal) {
    	modal.style.display = "none";
	}
}

function clickButtonEdit(){
	for(var i = 0 ; i<edit.length ; i++){
		edit[i].addEventListener('click', editSach);
	}
}

function editSach(){
	let button = event.target;
	let mssv = button.dataset.mssv;
	let hoten = button.dataset.hoten;
	let email = button.dataset.email;
	mssvIp.value = mssv;
	hotenIp.value = hoten;
	emailIp.value = email;
	modal.style.display ='block';
}

function main(){
	clickButtonEdit();
	navThanhVien.style.backgroundColor = '#eee';
}

main();