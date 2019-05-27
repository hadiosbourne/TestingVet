'use strict';

const NewsContentService = require('../services/NewsContentService');

/**
 * Creates the news content
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 *
 * @author Hadi Shayesteh <hadishayesteh@gmail.com>
 * @since  25 May 2019
 */
module.exports.postNewsContent = function postNewsContent(req, res, next) {
  let newsContentService = new NewsContentService();
  newsContentService.postNewsContent(req, res, next);
};

/**
 * Retrieves all news contents
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 *
 * @author Hadi Shayesteh <hadishayesteh@gmail.com>
 * @since  25 May 2019
 */
module.exports.listNewsContents = function listNewsContents(req, res, next) {
  let newsContentService = new NewsContentService(req.Logger, req.octophant);
  newsContentService.listNewsContents(req, res, next);
};

/**
 * Updates a news content
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 *
 * @author Hadi Shayesteh <hadishayesteh@gmail.com>
 * @since  25 May 2019
 */
module.exports.putNewsContent = function putNewsContent(req, res, next) {
  let newsContentService = new NewsContentService(req.Logger, req.octophant);
  newsContentService.putNewsContent(req, res, next);
};

/**
 * Deletes a news content
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 *
 * @author Hadi Shayesteh <hadishayesteh@gmail.com>
 * @since  25 May 2019
 */
module.exports.deleteNewsContent = function deleteNewsContent(req, res, next) {
  let newsContentService = new NewsContentService(req.Logger, req.octophant);
  newsContentService.deleteNewsContent(req, res, next);
};