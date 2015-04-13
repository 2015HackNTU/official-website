var app = angular.module('courseApp', []);

app.controller('courseCtrl', ['$scope', function ($scope) {
	// $scope.test = 'poka';
	$scope.section = '';
	$scope.clickOn = function(sectionName){
		if (sectionName === $scope.section){
			$scope.section = '';
			$scope.content = '';
		}else{
			$scope.section = sectionName;
			$scope.content = $scope.text[sectionName];
		}
		console.log($scope.this)
	};
	$scope.text = {
		// Type your content here
		'ror' : 'ROROROROR', 
		'ios' : 'iosoios',
		'uiux': 'uiuxxxxx',
		'iot' : 'iottottot'
	}

}]);