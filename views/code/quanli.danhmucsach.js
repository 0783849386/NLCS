let modal  = document.querySelector('.modal');
var edit  = document.querySelectorAll('#editSach');
let ipTenSach = document.getElementById('tensachUp');
let ipTacGia = document.getElementById('tacgiaUp');
let ipSoLuong = document.getElementById('soluongUp');
let ipIdSach = document.getElementById('idsachUp');

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
	let idsach = button.dataset.idsach;
	let tensach = button.dataset.tensach;
	let tacgia = button.dataset.tacgia;
	let soluong = button.dataset.soluong;
	idsachUp.value = idsach;
	ipTenSach.value = tensach;
	ipTacGia.value = tacgia;
	ipSoLuong.value = soluong;
	modal.style.display ='block';
}

function main(){
	clickButtonEdit();
	console.log('con meo')
}

main();