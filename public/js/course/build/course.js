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
			$scope.content = {
				'title' : $scope.inlineTitle[sectionName],
				'text'	: $scope.inlineContent[sectionName]
			}
			// $scope.title = $scope.inlineTitle[sectionName];
			// $scope.text = $scope.inlineContent[sectionName];
			console.log('')
		}
		console.log($scope.this)
	};
	$scope.inlineTitle = {
		// Type your content here
		'ror' : 'Ruby on Rails', 
		'ios' : 'iOS Development',
		'uiux': 'UI/UX',
		'iot' : 'Internet of Things'
	}
	$scope.inlineContent = {
		'ror' : 'Ruby on Rails 是由高見龍龍哥所教導', 
		'ios' : 'iOS 開發課程由張景隆大哥所指導',
		'uiux': 'UI/UX 是門有趣的課',
		'iot' : 'Internet of Things 物聯網為CAVEEducation團隊指導'
	}

}]);