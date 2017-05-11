var User = require('../models/user');
var Prof = require('../models/prof')
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';

module.exports = function (router) {


	// router.post('/users', function (req, res) {
	// 	var user = new User();
	// 	user.username = req.body.username;
	// 	user.password = req.body.password;
	// 	user.email = req.body.email;
	// 	if (req.body.username == null || req.body.username == "" || req.body.password == null || 
	// 	req.body.password == "" || req.body.email == null || req.body.email == "") {
	// 		res.json({success:false, message:'ensure details'})

	// 	} else {
			
	// 		user.save(function(err){
	// 			if (err){
	// 				console.log(err);
	// 				res.json({success:false, message:'Username al'})
	// 			}else{
	// 				res.json({success:true, message:"created"})
	// 			}
	// 		});
			
	// 	}
	// });
	// router.post('/profile', function (req, res) {
	// 	var prof = new Prof();
	// 	user.username = req.body.username;
	// 	user.password = req.body.password;
	// 	user.email = req.body.email;
	// 	if (req.body.username == null || req.body.username == "" || req.body.password == null || 
	// 	req.body.password == "" || req.body.email == null || req.body.email == "") {
	// 		res.json({success:false, message:'ensure details'})

	// 	} else {
			
	// 		user.save(function(err){
	// 			if (err){
	// 				console.log(err);
	// 				res.json({success:false, message:'Username al'})
	// 			}else{
	// 				res.json({success:true, message:"created"})
	// 			}
	// 		});
			
	// 	}
	// });
	

	router.post('/authenticate', function(req,res){
		User.findOne({username: req.body.username}).select('email username password').exec(function(err,user){
			if(err) throw err;
			if(!user){
				res.json({success: false, message:" could not authenticate"});
			}else if(user){
				var token = jwt.sign({ success:false, email: user.email}, secret, {expiresIn: '24h' });
				res.json({success:true, message: 'User in',token: token});
			}
		});
	});

	router.use(function(req,res,next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];
		if(token){
				jwt.verify(token,secret, function(err,decoded){
					if (err) {
						res.json({success: false, message: 'Token invald'});
					}else{
						req.decoded =decoded;
						next();
					}
				});
		}else{
			res.json({success:false, message:'No token provided'});
		}
	});

	router.post('/me',function(req,res){
		res.send(req.decoded);
	});

	router.post('/modal',function(erq,res){
		User.findOne({email: req.decoded.email},function(err,user){
			if(err) throw err;
			if(!user){
				res.json({success:false,message:'NO user was found'});
			}else{
				res.json({success:true,permission: user.permission});
			}
		});
	});

	return router;
};