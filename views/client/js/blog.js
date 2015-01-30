var blog = angular.module("blog", ['ngRoute']);



blog.controller('blogListCtrl', ['$scope','$http',function ($scope, $http) {
	
	$http.get('/api/posts').success(function(data) {
    	$scope.posts = data;//the variable is named posts,define by yourself
    	
	})
	// the page control
	// $scope.currentPage = 0;
	// $scope.pageSize = 3;
	// $scope.numberOfPages = function(){
	// 	if (!$scope.posts || !$scope.posts.length) return;
	// 	return Math.floor($scope.posts.length/$scope.pageSize)+1;
	// };
	// $scope.getNumber = function(num) {
	//     return new Array(num);   
	// };
	// $scope.pageClass = function(page){
	// 	return page == $scope.currentPage ? 'active' : '';
	// };
	// $scope.changePage = function(page){
	// 	$scope.currentPage = page;
	// };
               
}]);
blog.controller('blogCtrl',function ($rootScope, $scope, $http,$location,$routeParams) {
	
	// $http.get('/api/posts/pid').success(function(data) {
 //    $scope.total = data.length;

    $http.get('/api/posts/'+$routeParams.id).success(function(data) {

    if (data.length !== 0) $scope.p = data;
    else $location.path("/posts");
  });
	
               
});




