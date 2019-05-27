'use strict';

const StatusDetailsService = require('../services/StatusDetailsService');

/**
 * Gets the status of the service
 *
 * @param {ClientRequest} req - The http request object
 * @param {IncomingMessage} res - The http response object
 * @param {function} next - The callback used to pass control to the next action/middleware
 *
 * @author Hadi Shayesteh <hadishayesteh@gmail.com>
 * @since  25 June 2018
 */
module.exports.getSystemStatus = function getSystemStatus(req, res, next) {
  let statusDetailsService = new StatusDetailsService();
  statusDetailsService.getSystemStatus(req.swagger.params, res, next);
};

// NEW GENERATOR FUNCTIONS LOCATION