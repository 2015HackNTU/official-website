var blog = angular.module("blog", ['ngRoute']);
var index = angular.module('index', ['ngRoute']);

index.filter('object2Array', function() {
  return function(input) {
    var out = []; 
    for(i in input){
      out.push(input[i]);
    }
    return out;
  }
});

blog.controller('blogListCtrl', ['$scope','$http',function ($scope, $http) {

	$scope.numLimit = 100;//output 100 character
	$http.get('/api/posts').success(function(data) {
    	$scope.posts = data;//the variable is named posts,define by yourself
    	/* the date split */
    	var len = data.length;
    	var output = new Array();
    	for (var i = 0; i < len;i++){
    		var t = new Date(data[i].create_at); 
    		//console.log(t);
    		output[i] = t.getYear()+1900 + "-" + t.getMonth()+1 + "-" + t.getDate(); 
    		data[i].create_at = output[i];
    	}
    	
	});

		
	/*the page control*/
	$scope.currentPage = 0;
	$scope.pageSize = 3;
	$scope.numberOfPages = function(){
		if (!$scope.posts || !$scope.posts.length) return;
		return Math.floor($scope.posts.length/$scope.pageSize)+1;
	};
	$scope.getNumber = function(num) {
	    return new Array(num);   
	};
	$scope.pageClass = function(page){
		return page == $scope.currentPage ? 'active' : '';
	};
	$scope.changePage = function(page){
		$scope.currentPage = page;
	};
               
}]);
blog.controller('blogCtrl',function ($rootScope, $scope, $http,$location,$routeParams) {
	
	// $http.get('/api/posts/pid').success(function(data) {
 //    $scope.total = data.length;

    $http.get('/api/posts/'+$routeParams.id).success(function(data) {

    if (data.length !== 0) $scope.p = data;
    else $location.path("/posts");
  });
	
               
});




