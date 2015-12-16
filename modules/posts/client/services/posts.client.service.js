'use strict';

//Posts service used for communicating with the articles REST endpoints
angular.module('posts').factory('Posts', ['$resource',
  function ($resource) {
    return $resource('api/posts/:postId', {
      postId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('posts').factory('ActPosts', ['$resource',
  function ($resource) {
    var actP = {};
    actP.getLastestPost = function() {
        return $resource('api/posts/getLastestPost');
    };
    actP.getRandomPost = function() {
        return $resource('/api/posts/get/RandomPost');
    };
    return actP;
  }
]);

