'use strict';
const NewsContent = require('../models/NewsContent');
const _ = require('lodash');

/**
 * Create an instance of the news content service
 *
 * @author Hadi Shayesteh <hadishayesteh@gmail.com>
 * @since  25 May 2019
 */
class NewsContentService {

  constructor() {}

  /**
   * Create the content of the news
   *
   * @param {object} swaggerParams - The request arguments passed in from the controller
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   *
   * @author Hadi Shayesteh <hadishayesteh@gmail.com>
   * @since  25 May 2019
   *
   * @return void
   */
  postNewsContent(req, res, next) {
    let body = req.swagger.params.news_content.value;
    let newsContent = new NewsContent(body);
    newsContent.save((err, result) => {
      if (err) {
        let runTimeError = 'unexpected error happened in NewsContentService, postNewsContent method' + err
        res.end(runTimeError);
      }
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    });
  }

  /**
   * Create the content of the news
   *
   * @param {object} req - The request arguments passed in from the controller
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   *
   * @author Hadi Shayesteh <hadishayesteh@gmail.com>
   * @since  25 May 2019
   *
   * @return void
   */
  listNewsContents(req, res, next) {
    let query = {};
    _.forOwn(req.swagger.params, (param, key) => {
      if (!_.isEmpty(param.value) && key !== 'authorization') {
        query[key] = param.value
      }
    });
    _getNewsContentList(query, (newsError, newsResult)=>{
      if (newsError) {
        res.end(newsError);
      }

      res.setHeader('Content-Type', 'application/json');
      if (!newsResult) {
        res.statusCode = 204;
        return res.end('There was no record found to be returned');
      }

      res.statusCode = 200;
      res.end(JSON.stringify(newsResult));
    })
  }

  /**
   * updates a news content
   *
   * @param {object} req - The request arguments passed in from the controller
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   *
   * @author Hadi Shayesteh <hadishayesteh@gmail.com>
   * @since  25 May 2019
   *
   * @return void
   */
  putNewsContent(req, res, next) {
    let body = req.swagger.params.news_content.value;
    let newsId = req.swagger.params.news_id.value;
    NewsContent.findOne({'_id': newsId}, (err, result) => {
      if (err) {
        res.end('There was an error while retrieving news record' + err);
      }
      if (!result) {
        res.statusCode = 404;
        return res.end('There was no news record with id ' + newsId + 'found to be updated');
      }
      _.forOwn(body, (param, key) => {
        if (!_.isEmpty(param)) {
          result[key] = param
        }
      });
      let saveResult = new NewsContent(result);
      saveResult.save((err, result) => {
        if (err) {
          let runTimeError = 'unexpected error happened in NewsContentService, putNewsContent method' + err
          res.end(runTimeError);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      });
    })
  }

  /**
   * deletes a news content
   *
   * @param {object} req - The request arguments passed in from the controller
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   *
   * @author Hadi Shayesteh <hadishayesteh@gmail.com>
   * @since  25 May 2019
   *
   * @return void
   */
  deleteNewsContent(req, res, next) {
    let newsId = req.swagger.params.news_id.value;
    NewsContent.findOneAndRemove({'_id': newsId}, (err, result) => {
      if (err) {
        res.end('There was an error while retrieving news record ', err);
      }
      if (!result) {
        res.statusCode = 404;
        return res.end('There was no news record with id ' + newsId + ' found to be deleted');
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    })
  }
}

module.exports = NewsContentService;

/**
 * Get the list news contents for a specific query
 *
 * @param {object} query - The query to match
 * @param {function} callback - The callback
 *
 * @author Hadi Shayesteh <hadishayesteh@gmail.com>
 * @since  25 May 2019
 *
 * @private
 *
 * @return void
 */
function _getNewsContentList(query, callback) {
  NewsContent.find(query)
    .exec((err, results) => {
      if (err) {
        let runTimeError = 'An error occurred while retrieving news contents' + err;
        return callback(runTimeError);
      }
      return callback(null, results);
    });
}