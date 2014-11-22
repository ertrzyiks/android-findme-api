(function (exports) {
    'use strict';

    var express = require('express'),
        Room = require('../models/room'),

        router = express.Router();

    router.get('/rooms', function (req, res) {
        Room.find({}, function (err, rooms) {
            res.send(rooms);
        });
    });

    router.post('/rooms', function (req, res) {
        var room = new Room(req.body);

        if (room.get('password')) {
            room.set('is_public', false);
        }

        room.save(function (err, model) {
            if (err) {
                res.status(400).send(err);
                return;
            }

            res.send(model);
        });
    });

    exports.router = router;
})(module.exports);
