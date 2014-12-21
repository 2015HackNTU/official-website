exports.index = function(req,res){
	res.render('index',{title:"lulala"});
}

/* GG

var db = require('../db');
var mongoose = require('mongoose');
var BreakingNews = mongoose.model('BreakingNews');
var BlogPosts = mongoose.model('BlogPosts');
var Users = mongoose.model('Users')

exports.users = function (req, res){
	//Display on User Page//
	Users.find(function(error, users){
    	res.render('user', { title: 'User test', users: users});
  	});
  	console.log('>>>>> route through index.js fn exports.user <<<<<');
}
exports.users.create = function (req,res){
	console.log(req.body.name);
  	console.log('>>>>> route through index.js fn exports.user.create <<<<<');
	new User({
		name : req.body.name,
		department : req.body.department,
		username : req.body.username,
		password : req.body.password,
		creat_at : req.body.create_at
	}).save( function( err, user, count ){
		console.log(req.body.department + "'s " + req.body.name + " is created.")
		res.redirect( '/user' );
	});
};
exports.users.destroy = function(req,res){
	console.log(req.body.name + ' removed');
  	console.log('>>>>> route through index.js fn exports.user.destroy <<<<<');
  	// Delete //
  	Users.findById(req.params.id, function(err, user){
    	user.remove( function(err, user){
      		res.redirect('/user');
		});
	});
};



exports.breakingnews = function(req,res){
	console.log(">>>> through index.js <<<<<");
	BreakingNews.find(function(error, news){
		res.render('news',{title:'Breaking News', news: news});
	});
};
exports.breakingnews.create = function(req,res){
	console.log(">>>> through index.js <<<<<");
	new BreakingNews({
		title : req.body.title,
		department : req.body.department,
		content : req.body.content,
		isImportant : req.body.isImportant,
		tag : req.body.tag,
		url : req.body.url,
		create_at : req.body.create_at
	}).save( function(err, news, count){
		console.log("Breaking News " + req.body.title + " is created.")
		res.redirect('/news');
	})
};
exports.breakingnews.destroy = function(req,res){
	console.log(req.body.title + ' removed');
  	console.log('>>>>> route through index.js fn exports.breakingnews.destroy <<<<<');
  	// Delete //
  	BreakingNews.findById(req.params.id, function(err, news){
    	news.remove( function(err, news){
      		res.redirect('/news');
		});
	});
};



exports.blogposts = function(req,res){
	console.log(">>>> through index.js <<<<<");
	blogposts.find(function(error, news){
		res.render('blog',{title:'Breaking News', news: news});
	});	
}
exports.blogposts.create = function(req,res){
	console.log(">>>> through index.js <<<<<");
	new BlogPosts ({
		title : req.body.title,
		department : req.body.department,
		author : req.body.author,
		content : req.body.content,
		tag : req.body.tag,
		create_at : {type: Date, default: Date.now}
	})
}
exports.blogposts.destroy = function(req,res){
	console.log(">>>> through index.js <<<<<");
	BlogPosts.findById(req.params.id, function(err, blogposts){
		blogposts.remove(function(err, news){
			res.redirect('/blogposts');
		})
	})

}
*/
