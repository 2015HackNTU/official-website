var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// Schema
var BreakingNews = new Schema({
	user_id : String,
	title : String,
	department : String,
	author : String,
	content : String,
	isImportant : Boolean,
	tag : Array,
	create_at : {type : Date, default: Date.now}
});

var User = new Schema({
	/* Authenticate Users */
	local : {
		name : String,
		department : String,
		email : String,
		password : String,
		create_at :  {type : Date, default: Date.now}
	},
	facebook : {
		id : String,
		token : String,
		email : String,
		name : String,
	}
});

var tempUser = new Schema ({
	/* Unahthenticate Users */
	local : {
		name : String,
		department : String,
		email : String,
		password : String,
		create_at :  {type : Date, default: Date.now}
	},
	isAuthenticate : { type : Boolean, default : false },
	authenticate_at : { type : Date }
})

var BlogPosts = new Schema({
	user_id : String,
	title : String,
	department : String,
	author : String,
	content : String,
	tag : Array,
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
// generating a hash
tempUser.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    //return password
};

// checking if password is valid
tempUser.methods.validPassword = function(password) {
     return bcrypt.compareSync(password, this.local.password);
    //return password;
};

var tempUsers = mongoose.model('tempUsers',tempUser);
var Users = mongoose.model('Users',User);
var BreakingNews = mongoose.model('BreakingNews',BreakingNews);
var BlogPosts = mongoose.model('BlogPosts',BlogPosts);
mongoose.connect('mongodb://admin:admin@ds063870.mongolab.com:63870/hackntu',function(){
	console.log("DB connected")
})
