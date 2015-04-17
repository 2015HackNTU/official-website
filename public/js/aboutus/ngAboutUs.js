var app = angular.module('ngAboutUs', []);
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
	$scope.flip = function(e){
		var style = e.target.style;
		
	}
}])