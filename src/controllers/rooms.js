(function (exports) {
    'use strict';

    var express = require('express'),
        Room = require('../models/room'),

        router = express.Router();

    router.get('/rooms', function (req, res) {
        Room.find({}, { __v: 0, password: 0 }, function (err, rooms) {
            res.send(rooms);
        });
    });

    exports.router = router;
})(module.exports);
