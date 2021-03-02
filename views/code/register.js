function register(){
	option = confirm("Đăng ký thành công! Bạn có muốn đăng nhập?");
	if(!option){
		return;
	}else{
		window.location.assign("http://localhost:3000/auth/login");
	}
}
register();