var mongoose 		= require('mongoose');
var Schema   		= mongoose.Schema;

 var UserSchema    = new Schema({	
 	email:             {type: String, required:true},
 	username:          {type: String, required:true},
 	phone:         	   {type: Number},	
 	current_city:      {type: String},
	relation:		   {type: String},
	receiver_name:		{type: String},
	disk: 				{type: Boolean, default: false}
	
 });





 module.exports   = mongoose.model('user', UserSchema);