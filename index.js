const  express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const connection = require('./dbmysql/db.mysql');
const authRouter = require('./routers/auth.router');
const quanliRouter = require('./routers/quanli.router');
const sachRouter =  require('./routers/sach.router');
const sinhvienRouter = require('./routers/sinhvien.router');
const trogiupRouter = require('./routers/trogiup.router');
const authMiddleware = require('./middlewares/auth.middleware');
const renderData = require('./routers/renderData.router');

app.use(express.static(path.join(__dirname, 'public')));
// SET STORAGE

 

// Using pug template engine
app.set('view engine', 'pug');
app.set('views', './views');
// parsing body request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//connection to database
app.use(function(req, res, next) {
  req.conn = connection;
  next();
});

app.get("/", function(req, res){
	res.redirect('/auth/login');
});
//router
app.use('/auth', authRouter);
app.use('/quanli', authMiddleware.requireAuth, quanliRouter);
app.use('/sach', authMiddleware.requireAuth, sachRouter);
app.use('/sinhvien',authMiddleware.requireSinhVien, sinhvienRouter);
app.use('/trogiup',authMiddleware.requireSinhVien, trogiupRouter);
app.use('/getData', renderData);


app.get("/demo", function(req, res){
	res.sendfile("demo.html");
});
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Server is running on port " + port);
});


