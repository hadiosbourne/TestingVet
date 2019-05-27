'use strict';
const JWT = require('jsonwebtoken');
const _ = require('lodash');
const PermissionRoles = require('../models/PermissionRoles');

/**
 * This module contains methods that assists with swaggers security
 * and JWT verification.
 *
 * @author hadi.shayesteh <hadishayesteh@gmail.com>
 * @since  25 May 2019
 *
 * @module SecurityHelper
 */
module.exports = {
  /**
   * Verify the JWT token with the secret
   *
   * @param {object} req - The request object
   * @param {object} token - The token passed to the helper
   * @param {object} secret - The secret specified by the api
   * @param {function} next - The next callback with structure function(err)
   *
   * @author hadi.shayesteh <hadishayesteh@gmail.com>
   * @since  25 May 2019
   */
  jwtVerification: function jwtVerification(req, token, secret, next) {
    JWT.verify(token, secret, function validate(err, decoded) {
      if (err) {
        return next('Invalid token specified');
      }
      if (_.isEmpty(decoded['role'])) {
        return next('Role needs to be defined in the jwt secret');
      }

      _validateAccess(req['method'], decoded['role'], (err, res)=>{
        if (err) {
          return next(err);
        }
        return next();
      });

    });
  }
};

/**
 * checks the permission of the user
 * 
 * @param {string} httpMethod - The http method on the request
 * @param {string} userRole - The user role retrieved from the api token
 * @param {function} callback - The callback
 *
 * @author Hadi Shayesteh <hadishayesteh@gmail.com>
 * @since  25 May 2019
 *
 * @private
 *
 * @return void
 */
function _validateAccess(httpMethod, userRole, callback) {
  let permissionMapping = {
    'GET': 'read',
    'POST': 'write',
    'PUT': 'update',
    'DELETE': 'delete'
  };
  let query = {role: userRole};
  PermissionRoles.find(query)
    .exec((err, results) => {
      if (err) {
        let runTimeError = 'An error occurred while retrieving news contents' + err;
        return callback(runTimeError);
      }
      console.log();
      
      if (!_.includes(results[0]['accessLevels'], permissionMapping[httpMethod])) {
        return callback('user does not have update access to this route, allowed actions for the user are: ' + results[0]['accessLevels']);
      }

      return callback();
    });
}