// Main Angular app and controllers app.js

var app = angular.module('blogApp',[]);

app.controller('PostController', function($scope,$http,$window){
    	$scope.formData = {
    		
    		title: '',
    		body: ''

    	};

        $scope.postById = {};

        $scope.posts = {};


        ($scope.getAllPosts = function(){

                $http.get('/api/blog')
                .success(function(data){

                    $scope.posts = data;
            

                });


        })();

            // $http.get('/api/blog')
            // 	.success(function(data){

            //     	$scope.posts = data;
            

            // 	});

        $scope.createPost = function (){

            $http({method: 'POST', url:'/api/blog', data: $scope.formData})
			.then(function(response){
			     //your code in case the post succeeds
                 $scope.formData = {};
                 $window.location.reload();

			    console.log(response);
			    })
			.catch(function(err){
			    //your code in case your post fails
			    console.log(err);
			    });

            }

        $scope.getPost = function (id) {

            $http({method: 'GET', url: '/api/blog/' + id, data: $scope.postById})
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

app.controller('PanelController', function($scope) {

        $scope.tab = 'blog';

        $scope.selectTab = function(setTab) {

            $scope.tab = setTab;

        };

        $scope.isSelected = function(checkTab) {

            return $scope.tab === checkTab;

        };

    });



app.directive('blogPost', function(){

    return {

        restrict: 'E',
        templateUrl: 'templates/post.html'

    };

});

app.directive('navBar', function(){

    return {

        restrict: 'E',
        templateUrl: 'templates/navbar.html'

    };

});

app.directive('aboutPage', function(){

    return {

        restrict: 'E',
        templateUrl: 'templates/about.html'

    };

});

app.directive('contact', function(){

    return {

        restrict: 'E',
        templateUrl: 'templates/contact.html'

    };

});

app.directive('createPost', function(){

    return {

        restrict: 'E',
        templateUrl: 'templates/createpost.html'

    };

});

app.directive('viewPost', function(){

    return {

        restrict: 'E',
        templateUrl: 'templates/postbyid.html'

    };

});

