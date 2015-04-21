var express = require('express'),
	router = express.Router(),
	fs = require('fs');

router.get('/member/:dept',function(req,res) { 
	var member = [];
	fs.readdir('./public/imgs/aboutus/member',function(err,files){
		if(!err){
			// console.log(files)
			for (var i = 0; i < files.length; i++){
				var dept = files[i].split('_')[0];
				var name = files[i].split('_')[1].split('.')[0];
				var url = files[i].replace(' ','\\ ');
				if ( dept === req.params.dept ){
					member.push({
						'department' : dept,
						'name' : name,
						'url' : '../../imgs/aboutus/member/'+url
					})
				}
			}
			res.send(member);  	
		}
		else
			console.log(err);
	})
});

module.exports = router;