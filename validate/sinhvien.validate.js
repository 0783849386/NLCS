module.exports.postRegister = function(req, res, next){
	var errors = [];
	if(!req.body.mssv){
		errors.push("Mssv is required!");
	}
	if(!req.body.hoten){
		errors.push("Name is required!");
	}
	if(!req.body.email){
		errors.push("Email is required!");
	}
	if(!req.body.pass){
		errors.push("Password is required!");
	}
	if(errors.length){
		res.render('auth/register', {
			errors: errors,
			values: req.body
		});
		return;
	}
	next();
}