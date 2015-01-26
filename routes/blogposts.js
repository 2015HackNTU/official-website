var db = require('../config/db');
var mongoose = require('mongoose');
var BreakingNews = mongoose.model('BreakingNews');
var BlogPosts = mongoose.model('BlogPosts');
var Users = mongoose.model('Users')
/* Blog Posts Start */
/* Blog Posts Start */
exports.blogposts = function(req,res){
	console.log(">>>> through blogposts.js <<<<<");
	BlogPosts.find(function(error, blogposts){
		res.json(blogposts);
	});	
}
exports.blogposts.newPosts =function(req,res){
	res.render('admin/newPosts',{
		user : req.user
	})
}
exports.blogposts.create = function(req,res){
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
exports.blogposts.edit = function(req,res){
	BlogPosts.findById(req.params.id,function(err,posts){
		console.log("GET:"+req.posts)
		res.render('admin/editPosts',{
			posts : posts,
			user : req.user
		})
	})
}
exports.blogposts.editUpdate = function(req,res){
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

exports.blogposts.destroy = function(req,res){
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
