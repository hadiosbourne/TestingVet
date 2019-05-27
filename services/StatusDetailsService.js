'use strict';

/**
 * Create an instance of the status details service
 *
 * @author Hadi Shayesteh <hadishayesteh@gmail.com>
 * @since  25 June 2018
 */
class StatusDetailsService {

  constructor() {}

  /**
   * Get the system status(uptime)
   *
   * @param {object} swaggerParams - The request arguments passed in from the controller
   * @param {IncomingMessage} res - The http response object
   * @param {function} next - The callback used to pass control to the next action/middleware
   *
   * @author Hadi Shayesteh <hadishayesteh@gmail.com>
   * @since  25 June 2018
   *
   * @return void
   */
  getSystemStatus(swaggerParams, res, next) {
    let objStatus = {
      'up_time': Math.floor(process.uptime())
    };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(objStatus));
  }

}

module.exports = StatusDetailsService;
