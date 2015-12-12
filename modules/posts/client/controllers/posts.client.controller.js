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

    $scope.authentication = Authentication;
    console.log(Authentication); 
    $scope.isCreation = true;
    // Create new Post
    $scope.create = function () {
      $scope.error = null;

      // Create new Post object
      var post = new Posts({
        title: this.title,
        content1: this.content1,
        content2: this.content2,
        linkaudio: this.linkaudio
      });

      // Redirect after save
      post.$save(function (response) {
        $scope.find();

        // Clear form fields
        $scope.title = '';
        $scope.content1 = '';
        $scope.content2 = '';
        $scope.linkaudio = '';

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
      this.title = postcurrent.title;
      this.content1 = postcurrent.content1;
      this.content2 = postcurrent.content2;
      this.linkaudio = postcurrent.linkaudio;
      $scope.isCreation = false;
    };

    $scope.resetform = function() {
      this.title = '';
      this.content1 = '';
      this.content2 = '';
      this.linkaudio = '';
    };
    // Update existing Article
    $scope.update = function (isValid) {
      $scope.isCreation = true;
      $scope.error = null;
      $scope.postcurrent.title = this.title;
      $scope.postcurrent.content1 = this.content1;
      $scope.postcurrent.content2 = this.content2;
      $scope.postcurrent.linkaudio = this.linkaudio;

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
