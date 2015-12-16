'use strict';

var Bombay = Bombay || {};

 Bombay.helpers = {
    isNotString: function(str) {
     return (typeof str !== "string");
    },
    copyObjectFields : function (originObject, fieldNamesArray)
    {
        var obj = {};

        if (fieldNamesArray === null)
            return obj;

        for (var i = 0; i < fieldNamesArray.length; i++) {
            obj[fieldNamesArray[i]] = originObject[fieldNamesArray[i]];
        }

        return obj;
    },
 };

// Articles controller
angular.module('posts')
.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  $sceProvider.enabled(false);
}).controller('MainController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts', 'ActPosts',
  function ($scope, $stateParams, $location, Authentication, Posts, ActPosts) {

    $scope.mopost = {title:"",content1:"",content2:"",linkaudio:""};

    $scope.username = "";

    $scope.authentication = Authentication;

    if ($scope.authentication.user === '') {
      $scope.isAuth = false;
    } else {
      $scope.isAuth = true;
    }
  
    $scope.isCreation = true;

    // Create new Post
    $scope.create = function () {
      $scope.error = null;

      // Create new Post object
      var post = new Posts({
        title: $scope.mopost.title,
        content1: $scope.mopost.content1,
        content2: $scope.mopost.content2,
        linkaudio: $scope.mopost.linkaudio
      });

      // Redirect after save
      post.$save(function (response) {
        $scope.find();
        console.log('save complete');
        // Clear form fields
        $scope.resetform();

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.changePostCurrent = function (post) {
      $scope.postcurrent = post;
    };

    // Remove existing Post
    $scope.remove = function (post) {
      console.log('removePost');
      if (post) {
        post.$remove(function(){
           $scope.find();
        });

      } else {
        $scope.post.$remove(function () {
          $location.path('posts');
        });
      }
    };

    $scope.editformupdate = function(postcurrent) {
      angular.extend($scope.mopost,postcurrent);
      $scope.isCreation = false;
    };

    $scope.resetform = function() {
      var objreset = {title : '',content1 : '',content2 : '',linkaudio : ''};
      angular.extend($scope.mopost,objreset);
    };
    
    // Update existing Article
    $scope.update = function (isValid) {
      $scope.isCreation = true;
      $scope.error = null;
      
      angular.extend($scope.postcurrent,$scope.mopost);

      var post = $scope.postcurrent;

      $scope.resetform();

      post.$update(function () {
        //$location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.posts = Posts.query();

      ActPosts.getLastestPost().query(function(res){
          $scope.postcurrent = res[0];
      });
      ActPosts.getRandomPost().query(function(res){
          $scope.postrandoms = res;
      });
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.post = Posts.get({
        postId: $stateParams.postId
      });

    };
  }
]);
