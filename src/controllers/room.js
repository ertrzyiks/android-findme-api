(function (exports) {
    'use strict';

    var sw = require('swagger-node-express'),
        swe = sw.errors,
        paramTypes = sw.paramTypes,
        Room = require('../models/room');

    exports.get = {
        'spec': {
            description: "Operations about rooms",
            path: "/rooms",
            method: "GET",
            summary: "Traverse through rooms list",
            notes: "Returns a room list",
            type: "RoomDisplayable",
            nickname: "getRoomList",
            produces: ["application/json"],
            parameters: [],
            responseMessages: []
        },
        'action': function (req, res) {
            Room.find({}, function (err, rooms) {
                res.send(rooms);
            });
        }
    };

    exports.post = {
        'spec': {
            description: "Operations about rooms",
            path: "/rooms",
            method: "POST",
            summary: "Create a new room",
            type: "Room",
            nickname: "createRoom",
            produces: ["application/json"],
            parameters: [
                paramTypes.body("Room", "Room object that needs to be added to the list", "Room")
            ],
            responseMessages: [
                swe.invalid('name')
            ]
        },
        'action': function (req, res) {
            var room = new Room(req.body);

            if (room.get('password')) {
                room.set('is_public', false);
            }

            room.save(function (err, model) {
                if (err) {
                    res.status(400).send(swe.invalid('name'));
                    return;
                }

                res.send(model);
            });
        }
    };
})(module.exports);
