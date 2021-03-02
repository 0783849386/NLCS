let btnMuon = document.querySelectorAll('#muon');
let btnPhieuMuon = document.querySelectorAll('#phieumuon');
let btnMuonSach = document.querySelector('#muonSach');
let btnTimKiem = document.getElementById('btn-timkiem');
let contentTimKiem = document.getElementById('timkiem-content');

function clickButtonMuon(){
	for(var i=0 ; i<btnMuon.length ; i++){
		btnMuon[i].addEventListener('click', muonSach);
	}
}
function clickButtonPhieuMuon(){
      for( var i = 0; i < btnPhieuMuon.length ; i++){
            btnPhieuMuon[i].addEventListener('click', xoaGioHang);
      }
}
async function timKiem(){
      var tensach = contentTimKiem.value || '1';

     await axios.get('http://localhost:3000/sinhvien/timkiem/'+tensach,).then(function(res){
            console.log('timkiem', tensach);
      });
       location.reload();
}
function xoaGioHang(){
      var button = event.target;
      var idgiohang = button.dataset.idgiohang;
      location.reload();
      axios.delete('http://localhost:3000/sinhvien/deleteGioHang/'+idgiohang, {}).then(function(res){
      });
}
function addDanhSachDuyet(){
      if(btnPhieuMuon.length == 0){
            option = confirm('Bạn cần thêm vào ít nhất 1 quyển sách.');
      }else
      if(btnMuonSach.value == 0){
            axios.post('http://localhost:3000/sinhvien/createDanhSachDuyet', {}).then(function(res){
                  console.log('Da gui request.');
            });
      }else{
            axios.delete('http://localhost:3000/sinhvien/deleteDanhSachDuyet', {}).then(function(res){
                  console.log('Da xoa Phieu Muon.');
            });  
      }
      location.reload();
}

function muonSach(event){
      if(btnPhieuMuon.length >= 5){
            option = confirm('Bạn chỉ có thể thêm vào phiếu 5 quyển sách.');
      }
      else{
            var button = event.target;
            var idsach = button.dataset.idsach;
            location.reload();
            axios.post('http://localhost:3000/sinhvien/createPhieuMuon/'+idsach, {}).then(function(res){
                  console.log('Da them vao gio hang..', idsach);
            });           
      }
}
function loadPage(){

}

function main(){
	clickButtonMuon();
      clickButtonPhieuMuon();
      btnMuonSach.addEventListener('click', addDanhSachDuyet);
      btnTimKiem.addEventListener('click', timKiem);
}
main();