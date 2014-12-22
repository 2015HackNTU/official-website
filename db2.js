//// Testing //////

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/userdata';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	// Assertion check
	assert.equal(null, err);
	// create DB
	var testDB = db.db('pokaDB');

	// create Collections
	var collOne = db.collection('collOne');
	var collSecond = testDB.collection('collOne');

	var object1 = {
		name : 'lulala',
		age : '21',
		interests : ['baseball','tennis','coding']
	}

	var object2 = {
		name : 'vivian',
		age : '17',
	}


	collOne.insert(object1, function(err,result){
		assert.equal(null,err);
		console.log("inserted");

		var cursor = collOne.find({}).stream({
			
			transform: function(doc) {
				console.log(doc);
				console.log('>>>>>>>>');
				return JSON.stringify(doc);
			}

		});

	    cursor.on('data', function(doc) {
	      console.log(doc);
	    });

	    cursor.once('end', function() {
	      	collOne.remove({},function(err,result){
				console.log('remove');
			});
	      db.close();
	    });

	});



  	console.log("Connected correctly to server");

});
