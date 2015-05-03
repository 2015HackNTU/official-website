var app = angular.module('ngAboutUs', []);
// var host = 'http://localhost:3000/';

app.controller('aboutUsCtrl', ['$scope','$http', function ($scope, $http) {
	$scope.poka = 'test';
	console.log('poka')
	$scope.preload = [];
	$scope.departments = ['TD','CD','HR','BD','DM','HackCampus','CR','Course','HC','Leader'];
	$scope.departmentList = {
		'TD':'Technology Development',
		'CD' : 'Cooperate Development',
		'HR' : 'Human Resource',
		'BD' : 'Brand Design',
		'DM' : 'Digital Marketing',
		'HackCampus' : 'HackCampus',
		'CR' : 'Community Relation',
		'Course' : 'Hack Course',
		'HC' : 'Logistic',
		'Leader' : 'Presidents'
	}
	$scope.spreadChild = function(whitchSide){
		if (whitchSide === 'both' && (!$scope.isActivatedLeft || !$scope.isActivatedRight) ){
			$scope.isActivatedLeft = true;
			$scope.isActivatedRight = true; 
		} else {
			$scope.isActivatedLeft  = (whitchSide === 'left' && !$scope.isActivatedLeft) ?  true : false;
			$scope.isActivatedRight = (whitchSide === 'right' && !$scope.isActivatedRight) ? true : false; 
		}
	}
	$scope.spreadChild('both');

	$scope.preloadImage = function(){
		for (var i = 0 ; i < $scope.departments.length; i++) {
			$http.get('/api/aboutus/member/' + $scope.departments[i]).success(function(data){
				angular.forEach(data, function(val){
					$scope.preload.push(val);
				})
			})
		}
	}
	$scope.preloadImage();

	$scope.flip = function(department){
		$scope.showContent = true;
		$scope.title = $scope.departmentList[department];

		// Member //
		$scope.members = [];
		for (var i = 0 ; i < $scope.preload.length; i++) {
			if (department === $scope.preload[i].department){
				$scope.members.push($scope.preload[i]);
			}
		}
	}


	$scope.currentPage = 1;
	$scope.maxPage = 2;
	$scope.prevPage = function(curr){
		if ( $scope.currentPage > 1 ){
			$scope.currentPage--;
			$('.director').addClass('prevPageAnimation');
			$('.director').removeClass('nextPageAnimation');
		}
	}
	$scope.nextPage = function(curr){
		if ( $scope.currentPage < $scope.maxPage ) {
			$scope.currentPage++;
			$('.director').addClass('nextPageAnimation');
			$('.director').removeClass('prevPageAnimation');
			$scope.isActivatedLeft = false;
			$scope.isActivatedRight = false; 
			$scope.spreadChild('both');	
		}		
		// $setTimeout($scope.isActivatedLeft = $scope.isActivatedRight = true,300000);
		 
	}	


	$scope.event = function(e){
		switch (e.keyCode) {
			case 38 : // Keyboard up event
				$scope.prevPage($scope.currentPage);
				break;
			case 40 : // Keyboard down event
				$scope.nextPage($scope.currentPage);
				break;
			case 27 :
				if( $scope.currentPage === 'director' )
					$scope.currentPage = 2;
				break;
		}
	};
	// $scope.preload = function(){
	// 	console.log( $scope.departments );
	// 	for (var i = 0; i < $scope.departments.length; i++){
	// 		$scope.flip($scope.departments[i]);
	// 		$scope.showContent = false;
	// 	}
	// }
	// $scope.preload();
	

}])
