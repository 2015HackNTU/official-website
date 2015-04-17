var app = angular.module('ngAboutUs', []);
var host = 'http://localhost:3000/'

app.controller('aboutUsCtrl', ['$scope', function ($scope) {
	$scope.poka = 'test';
	console.log('poka')
	$scope.spreadChild = function(whitchSide){
		if (whitchSide === 'both' && (!$scope.isActivatedLeft || !$scope.isActivatedRight) ){
			$scope.isActivatedLeft = $scope.isActivatedRight = true 
		} else {
			$scope.isActivatedLeft  = (whitchSide === 'left' && !$scope.isActivatedLeft) ?  true : false;
			$scope.isActivatedRight = (whitchSide === 'right' && !$scope.isActivatedRight) ? true : false; 
		}
	}
	$scope.flip = function(evt, origin){
		var s = evt.target.style;
		var tempUrl = s['background'];
		console.log(s, tempUrl, $scope.flipPicture[origin], $scope.originalPicture[origin].link );

		if ( s['background'] === '' || !$scope.originalPicture[origin].state ) {
			s.setProperty('background', 'url("' + $scope.flipPicture[origin] + '")');
			s.setProperty('background-size', 'cover');
		} else {
			s.setProperty('background', 'url("' + $scope.originalPicture[origin].link + '")');
			s.setProperty('background-size', 'cover');
		}
		$scope.originalPicture[origin].state = !$scope.originalPicture[origin].state;
	}

	$scope.resetPicture = function(){

		for (var i = 1; i <= 5; i++){
			$scope.originalPicture['left-'+i].state = false;
		}
		for (var i = 1; i <= 4; i++){
			$scope.originalPicture['right-'+i].state = false;			
		}

	}

	$scope.flipPicture = {
		'left-1': "https://graph.facebook.com/100002146774789/picture?width=300", 
		'left-2': "https://graph.facebook.com/Pusheen/picture?width=300", 
		'left-3': "https://graph.facebook.com/570343856323049/picture?width=300", 	
		'left-4': "https://graph.facebook.com/KPYouthLab/picture?width=300", 
		'left-5': "https://graph.facebook.com/Katsudon.Lien/picture?width=300",

		'right-1': "https://graph.facebook.com/100008445524101/picture?width=300",
		'right-2': "https://graph.facebook.com/BillGates/picture?width=300",
		'right-3': "https://graph.facebook.com/zuck/picture?width=300",
		'right-4': "https://graph.facebook.com/mykmt/picture?width=300"
	}

	$scope.originalPicture = {
		'left-1': { "link" : "../../imgs/aboutus/TD.svg", "state" : false },
		'left-2': { "link" : "../../imgs/aboutus/CD.svg", "state" : false },
		'left-3': { "link" : "../../imgs/aboutus/HR.svg", "state" : false },
		'left-4': { "link" : "../../imgs/aboutus/BD.svg", "state" : false },
		'left-5': { "link" : "../../imgs/aboutus/DM.svg", "state" : false },

		'right-1': { "link" : "../../imgs/aboutus/HC.svg", "state" : false },
		'right-2': { "link" : "../../imgs/aboutus/HackCourse.svg", "state" : false },
		'right-3': { "link" : "../../imgs/aboutus/CR.svg", "state" : false },
		'right-4': { "link" : "../../imgs/aboutus/HackCampus.svg", "state" : false }
	}
}])