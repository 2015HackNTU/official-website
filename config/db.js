var mongoose = require('mongoose'),
	bcrypt   = require('bcrypt-nodejs'),
	Schema = mongoose.Schema,
	autoIncrement = require('mongoose-auto-increment');

//var connection = mongoose.createConnection("mongodb://admin:admin@ds063870.mongolab.com:63870/hackntu");
 
//autoIncrement.initialize(connection);

// Schema

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

var Calendar = new Schema({
	user_id : String, 
	type : String, //開發小聚、社課....
	name : String, 
	date : Date, 
	time : String, 
	month : String,
	create_at : {type : Date, default : Date.now},
	description : String
})

var BreakingNews = new Schema({
	id : String,
	user_id : String,
	title : String,
	department : String,
	author : String,
	content : String,
	isImportant : Boolean,
	tag : Array,
	create_at : {type : Date, default: Date.now}
});

var BlogPosts = new Schema({
	id : String,
	user_id : String,
	title : String,
	department : String,
	author : String,
	content : String,
	photo : String,
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
/*
Calendar.plugin(autoIncrement.plugin, 'Calendar');
var Calendar = connection.model('Calendar',Calendar)
*/
var tempUsers = mongoose.model('tempUsers',tempUser);
var Users = mongoose.model('Users',User);
var BreakingNews = mongoose.model('BreakingNews',BreakingNews);
var BlogPosts = mongoose.model('BlogPosts',BlogPosts);
var Calendar = mongoose.model('Calendar',Calendar);
exports.BlogPosts = BlogPosts;
exports.Calendar = Calendar;
/*
mongoose.connect('mongodb://localhost/HackNTU-website',function(){
	console.log("DB connected")
}
mongoose.connect('mongodb://admin:admin@172.31.27.243:27017/testDB',function(){
	console.log('Remote EB connect')
})
*/
mongoose.connect('mongodb://admin:admin@ds063870.mongolab.com:63870/hackntu',function(){
	console.log('Remote DB connect')
})

