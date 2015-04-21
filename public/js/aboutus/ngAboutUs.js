var app = angular.module('ngAboutUs', []);
var host = 'http://localhost:3000/'

app.controller('aboutUsCtrl', ['$scope','$http', function ($scope, $http) {
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
	$scope.spreadChild('both');

	$scope.flip = function(department){
		$scope.showContent = true;
		$scope.title = $scope.departmentList[department];
		// Member //
		$scope.members = [];
		$http.get('/api/aboutus/member/' + department).success(function(data){
			angular.forEach(data, function(val){
				$scope.members.push(val);
			})
			console.log($scope.members);
		})
	}

	$scope.departmentList = {
		'TD':'Technology Development',
		'CD' : 'Cooperate Development',
		'HR' : 'Human Resource',
		'BD' : 'Brand Design',
		'DM' : 'Digital Marketing',
		'HackCampus' : 'Hack Campus',
		'CR' : 'Community Relation',
		'Course' : 'Hack Course',
		'HC' : 'Hackathon Competition'
	}

	

}])
