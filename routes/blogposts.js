var db = require('../config/db');
var mongoose = require('mongoose');
var BreakingNews = mongoose.model('BreakingNews');
var BlogPosts = mongoose.model('BlogPosts');
var Users = mongoose.model('Users')

/* Read Start */
exports.blogposts = function(req,res){
	console.log(">>>> through blogposts.js <<<<<");
	BlogPosts.find(function(error, blogposts){
        res.send(blogposts.toString("utf8"))
		//res.json(blogposts);
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
	new BlogPosts ({
		user_id : req.body.user_id,
		title : req.body.title,
		department : req.body.department,
		author : req.body.author,
		content : req.body.content,
		tag : req.body.tag,
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
}
/* Create End */

/* Edit Start */
exports.edit = function(req,res){
	// Send to edit page
	BlogPosts.findById(req.params.id,function(err,posts){
		console.log("GET:"+req.posts)
		res.render('admin/editPosts',{
			posts : posts,
			user : req.user
		})
	})
}
exports.editUpdate = function(req,res){
	// Update edit info
	console.log('update'+req.body.user_id)
	BlogPosts.findById(req.params.id, function(err, posts){
		Users.findById(req.body.user_id, function(err, user){
			if(err)
				res.redirect('client/error',{ message : err.message, err:{} })
			// Update //
			posts.user_id = req.body.user_id;
			posts.title = req.body.title;
			posts.department = req.body.department;
			posts.author = user.local.name;
			posts.content = req.body.content;
			posts.tag = req.body.tag;
			// Update //

			posts.save(function(err, posts, count){
				if(err)
					res.render('client/error',{message:err.message, err:{}})
				res.redirect('/profile');
			})
		})
	})
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
