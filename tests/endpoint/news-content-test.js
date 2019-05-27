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

describe('/news-content', function () {

  describe('get', function () {

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

    before(function (done) {
      NewsContent.insertMany(NewsContentRecords, (saveError) => {
        done(saveError);
      });
    });
    it('should respond with 200 All Agency Contact Number', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
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
        }
      };
      /*eslint-enable*/
      api.get('/v1/news-content')
        .set(header)
        .expect(200)
        .end(function (err, res) {
          if (err) {return done(err);}
          validator.validate(res.body, schema).should.be.true;
          done();
        });
    });

  });

  describe('post', function () {

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

    it('should respond with 201 when agency contact number created', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "items": {
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
        }
      };
      /*eslint-enable*/
      api.post('/v1/news-content')
        .set(header)
        .send(payload)
        .expect(201)
        .end(function (err, res) {
          if (err) {return done(err);}
          validator.validate(res.body, schema).should.be.true;
          done();
        });
    });

  });

});
