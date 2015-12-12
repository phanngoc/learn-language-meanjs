'use strict';

/**
 * Module dependencies.
 */
var posts = require('../controllers/posts.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/posts') //.all(articlesPolicy.isAllowed)
    .get(posts.list)
    .post(posts.create);

  app.route('/api/posts/getLastestPost')
    .get(posts.getLastestPost)
    .delete(posts.delete);

  app.route('/api/posts/get/RandomPost')
  .get(posts.getRandomPost);

  // Single article routes
  app.route('/api/posts/:postId') //.all(articlesPolicy.isAllowed)
    .get(posts.read)
    .put(posts.update)
    .delete(posts.delete);

  // Finish by binding the article middleware
  app.param('postId', posts.postByID);
};
