const express = require('express');
const app = express();
const mysql = require('mysql');

var connection = mysql.createConnection({
  // host: 'sql12.freemysqlhosting.net',
  // user: 'sql12391516',
  // password: 'jTDiLRyEKn',
  // database: 'sql12391516'
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'thuvien'
});
connection.connect(function(err){
	if(err) throw err;
	else 
		console.log('MySQL Connected...');		
});

module.exports = connection;