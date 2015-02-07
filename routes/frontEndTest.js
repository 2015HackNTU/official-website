var mongoose = require('mongoose')
var BlogPosts = mongoose.model('BlogPosts');
var Users = mongoose.model('Users');

module.exports = function(app){

	/* ==================================== 

		// Route tutorial //

			# GET method (ex: simple links, nav bar linking...)
			
			app.get('/example',function(req,res){
				res.render('example')
			});

				% Note % 
					We have "example.ejs" in views folder,
					and want to link "http://localhost:1337/example" to example.ejs page.
					And DONT forget slash in app.get().
				% Note %

			p.s. GET method can do almost all the simple routing~~~ 

	==================================== */

	app.get('/example',function(req,res){
		res.render('client/example', { message : 'example.ejs' }); // You can also pass something to the front
	});


	app.get('/api/todos',function(req,res){

	})

	
	//render to a file called example.ejs
	app.get('/test',function(req,res){
		res.render('client/testing', { 
			message : 'Test.ejs',
		});
	})

	app.get('/HackNTUMemberrrrr',function(req,res){
		res.render('client/HackNTUMembers')
	})
	app.get('/testnew',function(req,res){
		res.render('client/testnew',{

		})
	})
	app.get('/project',function(req,res){
		res.render('client/project')
	})
	app.get('/org',function(req,res){
		res.render('client/organization')
	})
	/* Move to routes/blogposts.js
		app.get('/blog',function(req,res){
			res.render('client/blog')
		})
	*/
	app.get('/posts/:id',function(req,res){
		res.render('client/posts/:id')
	})
	app.get('/activity',function(req,res){
		res.render('client/activitynew')
	})
	// get will add somethind in URL 
	//so it will add /HackNTUMenberrrrr behind URL

	app.get('/getUser', function(req,res){
		res.render('client/getUser')
    		
	})
	app.get('/clndr', function(req,res){
		res.render('client/testclndr')
    		
	})

	app.get('/month', function(req,res){
		res.render('client/testMonthBar')
    		
	})
}