'use strict';
const {assert} = require('chai');
const sinon = require('sinon');
const NewsContentService = require('../../services/NewsContentService');
const NewsContent = require('../../models/NewsContent');

describe('NewsContentService test scenarios', function () {
  describe('postNewsContent(): Creates a news content', function () {

    /**
     * Test that a 200 response code is returned when the post was successful
     *
     * @author Hadi Shayesteh <hadishayesteh@gmail.com>
     * @since  25 May 2019
     *
     * @covers services/NewsContentService.postNewsContent
     */
    it('200 response code is returned when the post was successful', function (done) {
      let req = {
        swagger: {
          params: {
            news_content: {
              value: {
                'category': 'sport',
                'source': 'string',
                'author': 'string',
                'title': 'string',
                'description': 'string',
                'url': 'string',
                'publishedAt': '2019-05-27T02:06:15.716Z',
                'content': 'string'
              }
            }
          }
        }
      }
      let expectedResponse = {
        'category': 'sport',
        'source': 'string',
        'author': 'string',
        'title': 'string',
        'description': 'string',
        'url': 'string',
        'publishedAt': '2019-05-27T02:06:15.716Z',
        'content': 'string'
      };
      let stubNewsContent = sinon.stub(NewsContent.prototype, 'save').callsFake((callback) => {
        callback(null, expectedResponse);
      });
  
      let nextSpy = sinon.spy();
      let headerSpy = sinon.spy();

      let endSpy = sinon.spy(function (responseBody) {
        assert.equal(nextSpy.callCount, 0);
        assert.equal(res.statusCode, 201, 'The response code does not match');
        assert.equal(responseBody, JSON.stringify(expectedResponse), 'The response body does not match');
        stubNewsContent.restore();
        done();
      });

      let res = {
        statusCode: 0,
        setHeader: headerSpy,
        end: endSpy
      };
      const newsContentService = new NewsContentService();
      newsContentService.postNewsContent(req, res, nextSpy);
    });
  });
  describe('listNewsContents(): List all the news records', function () {

    /**
     * Test that a 200 response code when all the news records are returned
     *
     * @author Hadi Shayesteh <hadishayesteh@gmail.com>
     * @since  25 May 2019
     *
     * @covers services/NewsContentService.listNewsContents
     * @covers services/NewsContentService._getNewsContentList
     */
    it('200 response code when all the news records are returned', function (done) {
      let req = {
        swagger: {
          params: {
            category: {
              value: 'sport'
            }
          }
        }
      }
      let expectedResponse = [
        {
          'category': 'sport',
          'source': 'string',
          'author': 'string',
          'title': 'string',
          'description': 'string',
          'url': 'string',
          'publishedAt': '2019-05-27T02:06:15.716Z',
          'content': 'string'
        }
      ];
      let expectedQuery = {
        'category': 'sport'
      };
      let arrResultsObject = {
        exec: function exec(callback) {
          callback(null, expectedResponse);
        }
      };
      let stubNewsContent = sinon.stub(NewsContent, 'find').callsFake((query) => {
        assert.deepEqual(
          query,
          expectedQuery,
          'Incorrect query was passed'
        );
        return arrResultsObject;      
      });

      let logSpy = sinon.spy();
      let nextSpy = sinon.spy();
      let headerSpy = sinon.spy();

      let endSpy = sinon.spy(function (responseBody) {
        assert.equal(nextSpy.callCount, 0);
        assert.equal(res.statusCode, 200, 'The response code does not match');
        assert.equal(responseBody, JSON.stringify(expectedResponse), 'The response body does not match');
        stubNewsContent.restore();
        done();
      });

      let res = {
        statusCode: 0,
        setHeader: headerSpy,
        end: endSpy
      };
      const newsContentService = new NewsContentService();
      newsContentService.listNewsContents(req, res, nextSpy);
    });
  });
  describe('putNewsContent(): replace a news record', function () {

    /**
     * Test that a 200 response code is returned when the news record is replaced
     *
     * @author Hadi Shayesteh <hadishayesteh@gmail.com>
     * @since  25 May 2019
     *
     * @covers services/NewsContentService.putNewsContent
     */
    it('200 response code is returned when the news record is replaced', function (done) {
      let req = {
        swagger: {
          params: {
            news_content: {
              value: {
                'category': 'sport',
                'source': 'string',
                'author': 'string',
                'title': 'string',
                'description': 'string',
                'url': 'string',
                'publishedAt': '2019-05-27T02:06:15.716Z',
                'content': 'string'
              }
            },
            news_id: {
              value: 'someId'
            }
          }
        }
      }
      let expectedResponse = {
        'category': 'sport',
        'source': 'string',
        'author': 'string',
        'title': 'string',
        'description': 'string',
        'url': 'string',
        'publishedAt': '2019-05-27T02:06:15.716Z',
        'content': 'string'
      };

      let expectedResponseFind = {
        '_id': 'someId',
        'category': 'sport',
        'source': 'string',
        'author': 'string',
        'title': 'string',
        'description': 'string',
        'url': 'string',
        'publishedAt': '2019-05-27T02:06:15.716Z',
        'content': 'string'
      };

      let stubNewsContentFind = sinon.stub(NewsContent, 'findOne').callsFake((query, callback) => {
        callback(null, expectedResponseFind);     
      });

      let stubNewsContentSave = sinon.stub(NewsContent.prototype, 'save').callsFake((callback) => {
        callback(null, expectedResponse);
      });
  
      let nextSpy = sinon.spy();
      let headerSpy = sinon.spy();

      let endSpy = sinon.spy(function (responseBody) {
        assert.equal(res.statusCode, 200, 'The response code does not match');
        assert.equal(responseBody, JSON.stringify(expectedResponse), 'The response body does not match');
        stubNewsContentSave.restore();
        stubNewsContentFind.restore();
        done();
      });

      let res = {
        statusCode: 0,
        setHeader: headerSpy,
        end: endSpy
      };
      const newsContentService = new NewsContentService();
      newsContentService.putNewsContent(req, res, nextSpy);
    });
  });
  describe('deleteNewsContent(): deletes a specific news record', function () {
    /**
     * Test that a 200 response code is returned when the record is removed
     *
     * @author Hadi Shayesteh <hadishayesteh@gmail.com>
     * @since  25 May 2019
     *
     * @covers services/NewsContentService.deleteNewsContent
     */
    it('200 response code is returned when the record is removed', function (done) {
      let req = {
        swagger: {
          params: {
            news_id: {
              value: 'someId'
            }
          }
        }
      }

      let expectedResponseFind = {
        '_id': 'someId',
        'category': 'sport',
        'source': 'string',
        'author': 'string',
        'title': 'string',
        'description': 'string',
        'url': 'string',
        'publishedAt': '2019-05-27T02:06:15.716Z',
        'content': 'string'
      };

      let stubNewsContentFind = sinon.stub(NewsContent, 'findOneAndRemove').callsFake((query, callback) => {
        callback(null, expectedResponseFind);     
      });


      let nextSpy = sinon.spy();
      let headerSpy = sinon.spy();

      let endSpy = sinon.spy(function (responseBody) {
        assert.equal(res.statusCode, 200, 'The response code does not match');
        assert.equal(responseBody, JSON.stringify(expectedResponseFind), 'The response body does not match');
        stubNewsContentFind.restore();
        done();
      });

      let res = {
        statusCode: 0,
        setHeader: headerSpy,
        end: endSpy
      };
      const newsContentService = new NewsContentService();
      newsContentService.deleteNewsContent(req, res, nextSpy);
    });
  });
});