'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a article
 */
exports.create = function (req, res) {
  var post = new Post(req.body);
  post.language = req.language;

  post.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
  var post = req.post;

  post.title = req.body.title;
  post.content1 = req.body.content1;
  post.content2 = req.body.content2;
  post.linkaudio = req.body.linkaudio;
  post.isPrivate = req.body.isPrivate;
  post.language = req.body.language;

  post.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var post = req.post;
  post.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Post.find().exec(function (err, posts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(posts);
    }
  });
};

/**
 * Article middleware
 */
exports.postByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Posts is invalid'
    });
  }

  Post.findById(id).exec(function (err, post) {
    if (err) {
      return next(err);
    } else if (!post) {
      return res.status(404).send({
        message: 'No post with that identifier has been found'
      });
    }
    req.post = post;
    next();
  });
};

exports.getLastestPost = function(req, res) {
  Post.find().sort({ created: -1 }).limit(1).exec(function (err, posts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(posts);
    }
  });
};

exports.getRandomPost = function(req, res) {
  // get 10 random songs 
  Post.random(function (err, posts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(posts);
    }
  });

};
