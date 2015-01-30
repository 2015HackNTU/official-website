var mongoose = require('mongoose');
var Calendar = mongoose.model('Calendar');

/* Front-end read Start */
exports.read = function(req,res){
	// Front-end send cal detail
	Calendar.find(function(err, cal){
		console.log(req.body)
        res.json(cal.toString("utf8"))
	})
}


/* Front-end read End*/


/* Create Start */
exports.newCalender = function(req,res){
	res.render('admin/newCal',{
		user : req.user
	})	
}

exports.create = function(req,res,next){
	console.log(req.body.month)
	new Calendar({
		user_id : req.body.user_id,
		type : req.body.type,
		name : req.body.name,
		date : req.body.date,
		time : req.body.time,
		month : req.body.month,
		description : req.body.description
	}).save(function(err,cal,count){
		console.log(cal)
		if(!err)
			res.redirect('/profile')
		else
			next(err)
	})
}
/* Create End */



/* Delete */
exports.destroy = function(req,res){
	// Delete cal
	Calendar.findById(req.params.id, function(err, cal){
		cal.remove(function(err, cal){
	        if(err){
		        res.status(err.status || 500);
	            res.render('client/error', {
	                message: err.message,
	                err: err
	            });
	        }   
			res.redirect('/profile');
		})
	})

}
