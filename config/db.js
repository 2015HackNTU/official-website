var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
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
	local : {
		name : String,
		department : String,
		email : String,
		username : String,
		password : String,
		create_at : {type: Date, default: Date.now}
	},
	facebook : {
		id : String,
		token : String,
		email : String,
		name : String,
	}
});

var BlogPosts = new Schema({
	title : String,
	department : String,
	author : String,
	content : String,
	tag : String,
	create_at : {type: Date, default: Date.now}
});

// generating a hash
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    //return password
};

// checking if password is valid
User.methods.validPassword = function(password) {
     return bcrypt.compareSync(password, this.local.password);
    //return password;
};


var Users = mongoose.model('Users',User);
var BreakingNews = mongoose.model('BreakingNews',BreakingNews);
var BlogPosts = mongoose.model('BlogPosts',BlogPosts);
mongoose.connect('mongodb://localhost/HackNTU-website',function(){
	console.log("DB connected")
})
