const  express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();


const authRouter = require('./routers/auth.router');
const quanliRouter = require('./routers/quanli.router');
const sachRouter =  require('./routers/sach.router');
const sinhvienRouter = require('./routers/sinhvien.router');
const authMiddleware = require('./middlewares/auth.middleware');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function(req, res){
	res.redirect('/auth/login');
});
app.use('/auth', authRouter);
app.use('/quanli', authMiddleware.requireAuth, quanliRouter);
app.use('/sach', authMiddleware.requireAuth, sachRouter);
app.use('/sinhvien',authMiddleware.requireSinhVien, sinhvienRouter);

app.get("/demo", function(req, res){
	res.sendfile("demo.html");
});
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Server is running on port " + port);
});


