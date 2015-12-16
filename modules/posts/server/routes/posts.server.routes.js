'use strict';

/**
 * Module dependencies.
 */
var posts = require('../controllers/posts.server.controller');
var postsPolicy = require('../policies/posts.server.policy');
module.exports = function (app) {
  // Articles collection routes
  app.route('/api/posts').all(postsPolicy.isAllowed)
    .get(posts.list)
    .post(posts.create);

  app.route('/api/posts/getLastestPost')
    .get(posts.getLastestPost)
    .delete(posts.delete);

  app.route('/api/posts/get/RandomPost')
  .get(posts.getRandomPost);

  // Single article routes
  app.route('/api/posts/:postId').all(postsPolicy.isAllowed)
    .get(posts.read)
    .put(posts.update)
    .delete(posts.delete);

  // Finish by binding the article middleware
  app.param('postId', posts.postByID);
};
