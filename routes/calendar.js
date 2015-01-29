var mongoose = require('mongoose');
var Calendar = mongoose.model('Calendar');


exports.read = function(req,res){

	Calendar.find(function(err, cal){
		console.log(req)
			
        res.json(cal.toString("utf8"))
	})

}