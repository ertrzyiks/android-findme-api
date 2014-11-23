var expect = require('chai').expect;

describe('Password Util', function () {
    'use strict';

    var passwordUtil = require('../../src/util/password.js');

    it('should be able to hash and positively validate correct password', function (done) {
        passwordUtil.hash('my-password', function (err, hash, salt) {
            passwordUtil.validatePassword('my-password', hash, salt, function (err, result) {
                expect(result).to.be.true();
                done();
            });
        });
    });

    it('should be able to hash and reject invalid password', function (done) {
        passwordUtil.hash('my-password', function (err, hash, salt) {
            passwordUtil.validatePassword('other-password', hash, salt, function (err, result) {
                expect(result).to.be.false();
                done();
            });
        });
    });
});
