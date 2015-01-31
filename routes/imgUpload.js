var fs = require('fs');
var bodyParser = require('body-parser');
	formidable = require('formidable'),
    util = require('util')
    fs   = require('fs-extra'),
    qt   = require('quickthumb');

module.exports = function(app){
	// Use quickthumb
	app.use(qt.static(__dirname + '/'));

	app.post('/upload', function (req, res){
	  var form = new formidable.IncomingForm();
	  form.parse(req, function(err, fields, files) {
	  	//console.log(files)
	  	//console.log(files.image)
	    res.redirect('/upload/'+files.image.name) // send photo just uploaded
	    /*
	    res.writeHead(200, {'content-type': 'text/plain'});
	    res.write('received upload:\n\n');
	    res.end(util.inspect({fields: fields, files: files}));
	    */
	  });

	  form.on('end', function(fields, files) {
	    /* Temporary location of our uploaded file */
	    var temp_path = this.openedFiles[0].path;
	    /* The file name of the uploaded file */
	    var file_name = this.openedFiles[0].name;
	    /* Location where we want to copy the uploaded file */
	    var new_location = 'upload/';

	    fs.copy(temp_path, new_location + file_name, function(err) {  
	      if (err) {
	        console.error(err);
	      } else {
	        console.log("success!")
	      }
	    });
	  });
	});

	app.get('/upload',function(req,res){
		res.render('admin/upload',{
			img:""
		})
	})

	/// Show files
	app.get('/upload/:file', function (req, res){
		file = req.params.file;
		console.log(file)
		var img = fs.readFileSync( "./upload/" + file );
		//res.writeHead(200, {'Content-Type': '' });
		//res.end(img);
		res.render('admin/upload',{
			img : file
		})

	});



}