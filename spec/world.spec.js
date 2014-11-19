var expect = require('chai').expect;

describe('World', function () {
    'use strict';

    var World = require('../features/support/world.js').World;

    describe('Answer comparator', function () {
        it('should make equal two empty objects', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '{}',
                    json2 = '{}';

                expect(world.areEqualJSONs(json1, json2)).to.be.true();

                done();
            }
        });

        it('should ignore whitespaces between tokens', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '{"a":true}',
                    json2 = '{ "a": true }';

                expect(world.areEqualJSONs(json1, json2)).to.be.true();

                done();
            }
        });

        it('should ignore order of fields', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '{"a":true,"b":false}',
                    json2 = '{"b":false,"a": true}';

                expect(world.areEqualJSONs(json1, json2)).to.be.true();

                done();
            }
        });

        it('should not make equal two different object', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '{"a":true}',
                    json2 = '{"b":false,"a": true}';

                expect(world.areEqualJSONs(json1, json2)).to.be.false();

                done();
            }
        });

        it('should make equal two empty arrays', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '[]',
                    json2 = '[]';

                expect(world.areEqualJSONs(json1, json2)).to.be.true();

                done();
            }
        });

        it('should make equal arrays with same values', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '[1,2,3]',
                    json2 = '[1,2,3]';

                expect(world.areEqualJSONs(json1, json2)).to.be.true();

                done();
            }
        });

        it('should make equal arrays with same nested values', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '[{"a": 1}, {"b": 2}]',
                    json2 = '[{"a": 1}, {"b": 2}]';

                expect(world.areEqualJSONs(json1, json2)).to.be.true();

                done();
            }
        });

        it('should make not equal array of different length', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '[{"a": 1}, {"b": 2}]',
                    json2 = '[{"a": 1}]';

                expect(world.areEqualJSONs(json1, json2)).to.be.false();

                done();
            }
        });

        it('should not make equal arrays with same values, but different order', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '[1,2,3]',
                    json2 = '[3,2,1]';

                expect(world.areEqualJSONs(json1, json2)).to.be.false();

                done();
            }
        });

        it('should not make equal array and object', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '{}',
                    json2 = '[]';

                expect(world.areEqualJSONs(json1, json2)).to.be.false();

                done();
            }
        });

        it('should match to wildcard object of given type', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '{"id": "1", "field": "value"}',
                    json2 = '{"id": "MY_ID", "field": "value"}';

                expect(world.areEqualJSONs(json1, json2, {'MY_ID': 'string'})).to.be.true();

                done();
            }
        });

        it('should not match to wildcard object of different type', function (done) {
            var world = new World(next);

            function next() {
                var json1 = '{"id": "1", "field": "value"}',
                    json2 = '{"id": "MY_ID", "field": "value"}';

                expect(world.areEqualJSONs(json1, json2, {'MY_ID': 'number'})).to.be.false();

                done();
            }
        });
    });
});
