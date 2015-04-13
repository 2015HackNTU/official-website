var blog = angular.module("blog", ['ngRoute']);
// var test = angular.module("test")

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


blog.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider	

	.when('/blog', {
			templateUrl : 'client/blog',
			controller  : 'blogListCtrl'
	})
    .when('posts/:id', {
	      templateUrl : 'client/posts',
	      controller  : 'blogCtrl'
    })
    
	.otherwise({
		redirectTo: '/client/blog'
	});
  $locationProvider.html5Mode(true);
}]);
blog.service('postId',function sendId(){
	var postId = this;
	postId.id = "testing"
})
blog.controller('blogListCtrl', ['$scope','$http','postId',function (postId, $scope, $http) {
	var post = this;

	console.log(post)

	console.log("I am in blogListCtrl");
	$scope.numLimit = 100;//output 100 character
	$http.get('/api/posts').success(function(data) {
    	console.log(data)
    	/* the date split */
    	var len = data.length;
    	var output = new Array();
    	for (var i = 0; i < len;i++){
    		var t = new Date(data[i].create_at); 
    		//console.log(t);
    		output[i] = t.getYear()+1900 + "-" + t.getMonth()+1 + "-" + t.getDate(); 
    		data[i].create_at = output[i];
    	}

    	$scope.posts = data;//the variable is named posts,define by yourself
    	
	});

	// View single post
	$scope.viewSinglePost = function(id){
		// console.log("test" + id )
		$http.get('/api/posts/'+id).success(function(data){
			console.log(data)
		})
	}
		
	/*the page control*/
	$scope.recentpageStart = 0;
	$scope.recentpageEnd = 2;
	$scope.currentPage = 0;
	$scope.pageSize = 3;
	$scope.numberOfPages = function(){
		if (!$scope.posts || !$scope.posts.length) return;
		if (($scope.posts.length) % ($scope.pageSize) === 0)
			return Math.floor($scope.posts.length/$scope.pageSize);
		else if (($scope.posts.length) % ($scope.pageSize) !== 0) 
			return Math.floor($scope.posts.length/$scope.pageSize)+1;
	};
	$scope.getNumber = function(num) {
	    var page =  new Array(num);  
	    for (var i = 0; i < num; i++) {
	     	page[i] = i +1;
	     }; 
	     return page;
	};
	$scope.pageClass = function(page){
		return page === $scope.currentPage ? 'active' : '';
	};
	$scope.changePage = function(page){
		$scope.currentPage = page;
	};
               
}]);


blog.controller('blogCtrl',['$scope', '$http', 'postId', function (postId,$rootScope, $scope, $http, $window, $location, $routeParams) {
	var post = this;

	console.log(post.id)
 	
 	console.log("in blogCtrl");
 	$scope.title = "test"
	console.log($scope.title)
 //    $http.get('/api/posts').success(function(data) {
 //    	console.log(data);

	//     if (data.length !== 0) 
	//     	$scope.p = data;
	//     else 
	//     	$location.path("/posts");

 // //    // $rootScope.title = $scope.p.id ;
 // //    // $scope.formset($scope.p);
 // //    // $http.get('api/posts/').success(function(data) {
 // //    // $scope.p = data;
	// });
		
               
}]);






