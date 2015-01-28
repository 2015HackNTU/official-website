var blog = angular.module('blog', ['ngRoute']);

index.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			title: 'IMDb2 - Internet Movies Database 2',
			templateUrl : 'partials/view.html',
			controller  : 'mainCtrl'
		})
		.when('/movies', {
			title: 'Movies List - IMDb2',
			templateUrl : 'partials/movieList.html',
			controller  : 'MoviesListCtrl'
		})
		.when('/blog/:id', {
      		title: ' - posts',
			templateUrl : 'partials/blog-single.html',
			controller  : 'blogCtrl'
		})
    
	.otherwise({
		redirectTo: '/'
	});
  $locationProvider.html5Mode(true);
}]);
