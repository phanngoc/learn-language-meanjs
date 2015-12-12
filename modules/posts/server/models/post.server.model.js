'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var  random = require('mongoose-random');
/**
 * Article Schema
 */
var PostSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content1: {
    type: String,
    default: '',
    trim: true
  },
  content2: {
    type: String,
    default: '',
    trim: true
  },
  linkaudio: {
    type: String,
    default: '',
    trim: true,
    required: 'Linkaudio cannot be blank'
  },
  isPrivate: {
    type: Boolean,
    default: false  
  },
  language: {
    type: Schema.ObjectId,
    ref: 'Language'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});
//PostSchema.plugin(random, { path: 'r' });

PostSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    rand = (rand > (count-3)) ? 3 : rand;
    this.find().limit(3).skip(rand).exec(callback);
  }.bind(this));
};

mongoose.model('Post', PostSchema);