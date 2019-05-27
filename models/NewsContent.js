'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NewsContentSchema = new Schema(
  {
    category: {
      type: String,
      required: true
    },  
    source: {
      type: String,
      required: true
    },
    author: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    url: {
      type: String,
      required: true
    },
    publishedAt: {
      type: Date
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
    collection: 'NewsContent'
  }
);

module.exports = mongoose.model('NewsContent', NewsContentSchema);
