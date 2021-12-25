function main() {
	let navSach = document.getElementById('nav-trogiup');
	navSach.style.backgroundColor = '#eee';
	var menuBar = document.getElementById('menuBar');
	var menu = menuBar.getElementsByTagName('li');
	menu[2].style.backgroundColor = '#ccc';
}
main();