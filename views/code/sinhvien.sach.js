let btnMuonSach = document.querySelector('#muonSach');
let btnTimKiem = document.getElementById('btn-timkiem');
let contentTimKiem = document.getElementById('timkiem-content');
let navSach = document.getElementById('nav-sach');
let tablePhieuMuon = document.getElementById('table-phieumuon');
let btnPhieuMuon = document.querySelectorAll('.phieumuon');
let modalImg  = document.querySelectorAll('.modalImg');
var xem = document.querySelectorAll('#xemImg');
      

function clickButtonMuon(){
      let btnMuon = document.querySelectorAll('#muon');
	for(var i=0 ; i<btnMuon.length; i++){
		btnMuon[i].addEventListener('click', muonSach);
	}
}
function clickButtonPhieuMuon(){
      btnPhieuMuon = document.querySelectorAll('.phieumuon');
      for( var i = 0; i < btnPhieuMuon.length ; i++){
            btnPhieuMuon[i].addEventListener('click', xoaGioHang);
      }
}
async function timKiem(){
      var tensach = contentTimKiem.value || '1';

     await axios.get('http://localhost:3000/sinhvien/timkiem/'+tensach,).then(function(res){
            //console.log('timkiem', tensach, res.data);
      });
      location.reload();
}
function xoaGioHang(){
      var button = event.target;
      var idgiohang = button.dataset.idgiohang;
      // Xóa theo id
      axios.delete('http://localhost:3000/sinhvien/deleteGioHang/'+idgiohang, {}).then(function(res){
      });
      // Load phieu muon
      axios.get('http://localhost:3000/getData/phieumuon').then(function(res){
            loadPhieuMuon(res.data);

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
            axios.post('http://localhost:3000/sinhvien/createPhieuMuon/'+idsach, {}).then(function(res){

            });
            // Load phieu muon
            axios.get('http://localhost:3000/getData/phieumuon').then(function(res){
                  loadPhieuMuon(res.data);
            });      
      }
}
function loadPage(){
      axios.get('http://localhost:3000/getData/phieumuon').then(function(res){
            loadPhieuMuon(res.data);
            clickButtonPhieuMuon();
      });
}

function loadPhieuMuon(items){
      var table1, table2 = '';
            table1 = '<table class="table table-bordered">'
                        +   '<tr>'
                        +     '<th>STT</th>'
                        +     '<th>Tên sách</th>'
                        +     '<th>Tác giả</th>'
                        +     '<th>Xóa</th>'
                        +     '</tr>';
      for(var i=0; i<5 ; i++){
            if(i< items.length){
                  table2 += "<tr><td>"+(i+1)+"</td>"
                        +"<td>"+items[i].tensach+"</td>"
                        +"<td>"+items[i].tacgia+"</td>"
                        +"<td><button class='btn phieumuon' data-idgiohang='"+items[i].idgiohang+"'>Xóa</button></td>"
                        +"</tr>";
            }else{
                  table2 += "<tr><td>"+(i+1)+"</td><td></td><td></td><td></td></tr>";
            } 
      }
      tablePhieuMuon.innerHTML = table1 + table2 +'</table>';
      clickButtonPhieuMuon();
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
function timkiem(){
      var tensach = contentTimKiem.value;
      if(tensach[0] != " " && tensach){
            axios.get('http://localhost:3000/getData/timkiemSach/'+tensach).then(function(res){
                  loadDanhMucSach(res.data);
            });
      }
      else{
            axios.get('http://localhost:3000/getData/danhmucsach').then(function(res){
                  loadDanhMucSach(res.data);
            });         
      }
}
function loadDanhMucSach(items){
      var table1, table2 = '';
      table1 = '<table class="table table-bordered">'
                  +   '<tr>'
                  +     '<th>STT</th>'
                  +     '<th>Tên sách</th>'
                  +     '<th>Tác giả</th>'
                  +     '<th>Số lượng</th>'
                  +     '<th>Mượn sách</th>'
                  +     '</tr>';
      for(var i=0; i<items.length ; i++){
            table2 += "<tr><td>"+(i+1)+"</td>"
                +"<td>"+items[i].tensach+"</td>"
                +"<td>"+items[i].tacgia+"</td>"
                +"<td>"+(items[i].soluong - items[i].soluongMuon)+"</td>"
                +"<td><button class='btn add' data-idsach='"+items[i].idsach+"'>Thêm</button></td>"
                +"</tr>";
      }
      danhMucSach.innerHTML = table1 + table2 +'</table>';
      clickButtonAdd();
}
function main(){
	clickButtonMuon();
      clickButtonXem();
      btnMuonSach.addEventListener('click', addDanhSachDuyet);
      btnTimKiem.addEventListener('click', timKiem);
      navSach.style.backgroundColor = '#eee';
      loadPage();
}
main();