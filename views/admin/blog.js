var posts = angular.module('posts'.[])
posts.controller('postCtrl', ['$http', function($http){
    var self = this;
    this.item = [];
    $http.get('/posts').then(function(res){
    	console.log(res.data)
    	selt.item = res.data;
    },function(err){
    	console.log('Error!!!!')
    })
}])
