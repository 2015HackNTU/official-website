 var blog = angular.module("blog", ['ngRoute']);


blog.filter('object2Array', function() {
  return function(input) {
    var out = []; 
    for(i in input){
      out.push(input[i]);
    }
    return out;
  }
});
blog.filter('startFrom', function() {
    return function(input, start) {
    	if (!input || !input.length) return;
    	return input.slice(start);
  	};
});


blog.controller('blogCtrl',function ($rootScope, $scope, $http, $window, $location, $routeParams) {
	
	// $http.get('/api/posts/pid').success(function(data) {
 //    $scope.total = data.length;
 	console.log("in blogCtrl");
    $http.get('/api/posts/'+$routeParams.id).success(function(data) {
    	console.log(data);

    if (data.length !== 0) $scope.p = data;
    else $location.path("/posts");

    $rootScope.title = $scope.p.id ;
    $scope.formset($scope.p);
    $http.get('api/posts/').success(function(data) {
    $scope.p = data;
  });
	

	
               
});




