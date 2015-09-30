// Main Angular app and controllers app.js

var app = angular.module('blogApp',[]);

app.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $routeProvider

    .when("/", {templateUrl: "templates/posts.html", controller: "PostController"})

    .when("/new", {templateUrl: "templates/createpost.html", controller: "PostController"})
    .when("/post/:id", {templateUrl: "templates/post.html", controller: "PostController"});

});

app.controller('PostController', function($scope,$http,$location,$routeParams){
    	$scope.formData = {
    		
    		title: '',
    		body: ''

    	};

        $scope.posts = {};

        $scope.post = $scope.posts[$routeParams.id];


        ($scope.getAllPosts = function(){

                $http.get('/api/blog')
                .success(function(data){

                    $scope.posts = data;
                    

                });


        })();

        

        $scope.createPost = function (){

            $http({method: 'POST', url:'/api/blog', data: $scope.formData})
			.then(function(response){
			     //your code in case the post succeeds
                 $scope.formData = {};
                 $location.path('/');

			    console.log(response);
			    })
			.catch(function(err){
			    //your code in case your post fails
			    console.log(err);
			    });

            }

        $scope.getPost = function () {



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


app.directive('navBar', function(){

    return {

        restrict: 'E',
        templateUrl: 'templates/navbar.html'

    };

});


