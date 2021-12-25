let modal  = document.querySelector('.modal');
let modalImg  = document.querySelectorAll('.modalImg');
var edit  = document.querySelectorAll('#editSach');
var xem = document.querySelectorAll('#xemImg');
let ipTenSach = document.getElementById('tensachUp');
let ipTacGia = document.getElementById('tacgiaUp');
let ipSoLuong = document.getElementById('soluongUp');
let ipIdSach = document.getElementById('idsachUp');
let navDms = document.getElementById('nav-dms');
let changeImg = document.getElementById('changeImg');




function clickButtonEdit(){
	for(var i = 0 ; i<edit.length ; i++){
		edit[i].addEventListener('click', editSach);
	}
}

function editSach(){
	window.onclick = function(event) {
	if (event.target == modal) {
    	modal.style.display = "none";
		}
	}
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

function clickButtonXem(){
	for(var i = 0 ; i<xem.length ; i++){
		xem[i].addEventListener('click', xemImg);
	}
}
function xemImg(){
	window.onclick = function(event) {
		for(var i=0 ; i< modalImg.length; i++){
			if (event.target == modalImg[i]) {
		    	modalImg[i].style.display = "none";
				}
			}
		}
	let button = event.target;
	let stt = button.dataset.stt - 2;
	modalImg[stt].style.display ='block';
}

function main(){
	clickButtonEdit();
	clickButtonXem();
	navDms.style.backgroundColor = '#eee';
}

main();