'use strict';
const chai = require('chai');
const ZSchema = require('z-schema');
const validator = new ZSchema({});
const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const api = supertest('http://localhost:5000'); // supertest init;
const config = require('config');
const NewsContent = require('../../models/NewsContent');

chai.should();

let secret = config.get('api_token');
let decoded = {
  'sub': '1234567890',
  'name': 'John Doe',
  'role': 'admin'
};
let jwtToken = jwt.sign(decoded, secret);

let header = {
  'authorization': jwtToken,
  'Accept': 'application/json'
};

describe('/news-content/{news_id}', function() {
  let NewsContentRecords = [
    {
      "category" : "sport",
      "newsAgency" : "string",
      "author" : "string",
      "title" : "string",
      "description" : "string",
      "url" : "string",
      "content" : "string",
      "source" : "string"
    },
    {
      "category" : "sport",
      "source" : "string",
      "author" : "string",
      "title" : "string",
      "description" : "string",
      "url" : "string",
      "content" : "string"
    }
  ];
  let newsId;
  before(function (done) {
    NewsContent.insertMany(NewsContentRecords, (saveError, saveRecord) => {
      if (saveError) {
        done(saveError);
      }
      newsId = saveRecord[0]._id;
      done();    
    });
  });
  describe('put', function() {
    let payload = {
      "category": "sport",
      "source": "string",
      "author": "string",
      "title": "string",
      "description": "string",
      "url": "string",
      "publishedAt": "2019-05-27T03:18:49.314Z",
      "content": "string"
    };

    it('should respond with 200 The updated news content...', function(done) {
      /*eslint-disable*/
      var schema = {
        "description": "news content",
        "type": "object",
        "required": [
          "category",
          "source",
          "url",
          "content"
        ],
        "properties": {
          "category": {
            "type": "string",
            "enum": [
              "sport",
              "weather",
              "politic",
              "social",
              "science"
            ]
          },
          "source": {
            "type": "string"
          },
          "author": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "url": {
            "type": "string"
          },
          "publishedAt": {
            "type": "string",
            "format": "date-time"
          },
          "content": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      api.put('/v1/news-content/' + newsId)
      .set(header)
      .send(payload)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

  });

  describe('delete', function() {
    it('should respond with 200 The deleted news content...', function(done) {
      /*eslint-disable*/
      var schema = {
        "description": "news content",
        "type": "object",
        "required": [
          "category",
          "source",
          "url",
          "content"
        ],
        "properties": {
          "category": {
            "type": "string",
            "enum": [
              "sport",
              "weather",
              "politic",
              "social",
              "science"
            ]
          },
          "source": {
            "type": "string"
          },
          "author": {
            "type": "string"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "url": {
            "type": "string"
          },
          "publishedAt": {
            "type": "string",
            "format": "date-time"
          },
          "content": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      api.del('/v1/news-content/' + newsId)
      .set(header)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        validator.validate(res.body, schema).should.be.true;
        done();
      });
    });

  });

});
