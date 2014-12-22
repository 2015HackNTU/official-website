var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema
var BreakingNews = new Schema({
	title : String,
	department : String,
	content : String,
	isImportant : Boolean,
	tag : String,
	create_at : {type : Date, default: Date.now}
});

var User = new Schema({
	name : String,
	department : String,
	email : String,
	username : String,
	password : String,
	create_at : {type: Date, default: Date.now}
});

var BlogPosts = new Schema({
	title : String,
	department : String,
	author : String,
	content : String,
	tag : String,
	create_at : {type: Date, default: Date.now}
});


var Users = mongoose.model('Users',User);
var BreakingNews = mongoose.model('BreakingNews',BreakingNews);
var BlogPosts = mongoose.model('BlogPosts',BlogPosts);
mongoose.connect('mongodb://localhost/HackNTU-website',function(){
	console.log("DB connected")
})
