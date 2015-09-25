// Main Angular app and controllers app.js

angular.module('blogApp',[])

    .controller('PostController', function($scope,$http){
    	$scope.formData = {
    		
    		title: '',
    		body: ''

    	};

            $http.get('/api/blog')
            	.success(function(data){

                	$scope.posts = data;
            

            	});

        $scope.createPost = function (){

            	$http({method: 'POST', url:'/api/blog', data: $scope.formData})
			    .then(function(response){
			         //your code in case the post succeeds
			         console.log(response);
			     })
			    .catch(function(err){
			         //your code in case your post fails
			         console.log(err);
			     });

            }

            function editPost(){}

            function deletePost(){}



});

