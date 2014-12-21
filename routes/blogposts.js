var db = require('../db');
var mongoose = require('mongoose');
//var BreakingNews = mongoose.model('BreakingNews');
var BlogPosts = mongoose.model('BlogPosts');
//var Users = mongoose.model('Users')

/* Blog Posts Start */
/* Blog Posts Start */
exports.blogposts = function(req,res){
	console.log(">>>> through blogposts.js <<<<<");
	BlogPosts.find(function(error, blogposts){
		res.render('blog',{title:'Blog Posts', blogposts: blogposts});
	});	
}
exports.blogposts.create = function(req,res){
	console.log(">>>> through blogposts.js <<<<<");
	new BlogPosts ({
		title : req.body.title,
		department : req.body.department,
		author : req.body.author,
		content : req.body.content,
		tag : req.body.tag,
		create_at : {type: Date, default: Date.now}
	}).save(function(err, blogposts, count){
		console.log("BlogPosts " + blogposts.title + " created.");
		res.redirect('/blog');
	})
}
exports.blogposts.destroy = function(req,res){
	console.log(">>>> through blogposts.js <<<<<");
	BlogPosts.findById(req.params.id, function(err, blogposts){
		blogposts.remove(function(err, blogposts){
			res.redirect('/blog');
		})
	})

}
/* Blog Posts End */