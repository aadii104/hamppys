var mongoose 		= require('mongoose');
var Schema   		= mongoose.Schema;

 var ProfSchema    = new Schema({	
 	phone:         	   {type: Number, required:true},	
 	current_city:      {type: String},
	relation:		   {type: String, required:true},
	receiver_name:	   {type: String, required:true},
	
 });





 module.exports   = mongoose.model('prof', ProfSchema);