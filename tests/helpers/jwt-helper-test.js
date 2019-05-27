'use strict';

const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');
const expect = chai.expect;
const JwtHelper = require('../../helpers/JWTSecurityHelper');
const JWT = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('JWT Helper testing scenarios', function () {

  describe('jwtVerification test cases', function () {

    let decoded = {
      iss: 'candidate',
      sub: 'system'
    };

    /**
     * Test for the successful verification of JWT
     *
     * @author hadi.shayesteh <hadishayesteh@gmail.com>
     * @since  25 May 2019
     *
     * @covers helpers/JWTSecurityHelper.jwtVerification
     */
    it('Testing the successful verification of JWT', function (done) {
      let jwtToken = jwt.sign(decoded, config.api_token);
      let req = {
        authentication: {
          jwt: {
            'token': jwtToken
          }
        }
      };
      let expectedJwtRequest = {
        iss: 'candidate',
        sub: 'system'
      };

      let nextSpy = sinon.spy(function () {
        expect(nextSpy.callCount).to.equal(1, 'Expected next() to be called once.');
        let decodedToken = JWT.decode(req.authentication.jwt.token, config.api_token);
        delete decodedToken.iat;
        assert.deepEqual(decodedToken, expectedJwtRequest, 'Incorrect token received by success test scenario');
        done();
      });

      JwtHelper.jwtVerification(req, jwtToken, config.api_token, nextSpy);
    });

  });
});