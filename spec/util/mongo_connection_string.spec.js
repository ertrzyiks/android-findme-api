var expect = require('chai').expect;

describe('MongoConnectionString', function () {
    'use strict';

    var getConnectionString = require('../../src/util/mongo_connection_string.js');

    it('should generate default connection string', function () {
        expect(getConnectionString()).to.be.equal('mongodb://localhost/test');
    });

    it('should generate host-only connection string', function () {
        expect(getConnectionString({
            host: 'mydomain.com'
        })).to.be.equal('mongodb://mydomain.com/test');
    });

    it('should generate connection string with username', function () {
        expect(getConnectionString({
            username: 'admin'
        })).to.be.equal('mongodb://admin@localhost/test');
    });

    it('should generate connection string with password', function () {
        expect(getConnectionString({
            password: 'admin'
        })).to.be.equal('mongodb://localhost/test');
    });

    it('should generate connection string with username and password', function () {
        expect(getConnectionString({
            username: 'admin',
            password: 'admin'
        })).to.be.equal('mongodb://admin:admin@localhost/test');
    });

    it('should generate connection string with host, username and password', function () {
        expect(getConnectionString({
            host: 'mydomain.com',
            username: 'admin',
            password: 'admin'
        })).to.be.equal('mongodb://admin:admin@mydomain.com/test');
    });

    it('should generate connection string with host, dbname, username and password', function () {
        expect(getConnectionString({
            username: 'admin',
            password: 'admin',
            host: 'mydomain.com',
            dbname: 'dbname'
        })).to.be.equal('mongodb://admin:admin@mydomain.com/dbname');
    });
});
