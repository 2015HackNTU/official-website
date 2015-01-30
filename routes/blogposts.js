var db = require('../config/db');
var mongoose = require('mongoose');
var BreakingNews = mongoose.model('BreakingNews');
var BlogPosts = mongoose.model('BlogPosts');
var Users = mongoose.model('Users')
var fs = require('fs');
var bodyParser = require('body-parser');
	formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra'),

/* Read Start */
exports.blogposts = function(req,res){
	console.log(">>>> through blogposts.js <<<<<");
	BlogPosts.find(function(error, posts){
        // res.send(posts.toString("utf8"))
		//res.json(posts);
		res.render('client/blog',{
			posts : posts
		})
	});	
}
exports.findPosts = function(req,res){
	BlogPosts.findById(req.params.id,function(err,post){
		console.log(req.params.id + " " + post)
		res.send(post.toString("utf8"))
	})
}
/* Read End */

/* Create Start */
exports.newPosts =function(req,res){
	// Send to create page
	res.render('admin/newPosts',{
		user : req.user
	})
}

exports.create = function(req,res){
	// Post create info
	console.log(">>>> through blogposts.js <<<<<");

	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		console.log(fields)
		new BlogPosts ({
			user_id : fields.user_id,
			title : fields.title,
			department : fields.department,
			author : fields.author,
			content : fields.content,
			photo : files.image.name,
			tag : fields.tag,
			create_at : {type: Date, default: Date.now}
		}).save(function(err, blogposts, count){
	        if(err){
		        res.status(err.status || 500);
	            res.render('error', {
	                message: err.message,
	                err: {}
	            });
	        }   
			console.log("BlogPosts " + blogposts.title + " created.");
			res.redirect('/profile');
		})
	});

  	form.on('end', function(fields, files) {
	    /* Temporary location of our uploaded file */
	    var temp_path = this.openedFiles[0].path;
	    /* The file name of the uploaded file */
	    var file_name = this.openedFiles[0].name;
	    /* Location where we want to copy the uploaded file */
	    var new_location = 'upload/';

	    fs.copy(temp_path, new_location + file_name, function(err) {  
	      if (err) {
	        console.error(err);
	      } else {
	        console.log("success!")
	      }
	    });
	});


	
}
/* Create End */

/* Edit Start */
exports.edit = function(req,res){
	// Send to edit page
	BlogPosts.findById(req.params.id,function(err,posts){
		console.log("GET:"+req.posts)
		res.render('admin/editPosts',{
			posts : posts,
		})
	})
}
exports.editUpdate = function(req,res){
	// Update edit info
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		
		console.log('update'+req.body.user_id)

		BlogPosts.findById(req.params.id, function(err, posts){
			Users.findById(fields.user_id, function(err, user){
				if(err)
					res.redirect('client/error',{ message : err.message, err:{} })
				// Update //
				posts.user_id = fields.user_id;
				posts.title = fields.title;
				posts.department = fields.department;
				posts.author = user.local.name;
				posts.content = fields.content;
				posts.photo = files.image.name;
				posts.tag = fields.tag;
				// Update //

				posts.save(function(err, posts, count){
					if(err)
						res.render('client/error',{message:err.message, err:{}})
					res.redirect('/profile');
				})
			})
		})
		
	});

  	form.on('end', function(fields, files) {
	    /* Temporary location of our uploaded file */
	    var temp_path = this.openedFiles[0].path;
	    /* The file name of the uploaded file */
	    var file_name = this.openedFiles[0].name;
	    /* Location where we want to copy the uploaded file */
	    var new_location = 'upload/';

	    fs.copy(temp_path, new_location + file_name, function(err) {  
	      if (err) {
	        console.error(err);
	      } else {
	        console.log("success!")
	      }
	    });
	});

	
}
/* Edit End */


exports.destroy = function(req,res){
	// Delete posts
	console.log(">>>> through blogposts.js <<<<<");
	BlogPosts.findById(req.params.id, function(err, blogposts){
		blogposts.remove(function(err, blogposts){
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
/* Blog Posts End */
