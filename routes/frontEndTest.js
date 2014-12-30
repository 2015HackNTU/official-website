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
		res.render('example', { message : 'example.ejs' }); // You can also pass something to the front
	});



}