(function (exports) {
    'use strict';

    var sw = require('swagger-node-express'),
        swe = sw.errors,
        paramTypes = sw.paramTypes,
        Room = require('../models/room'),
        ObjectId = require('mongoose').Types.ObjectId;

    exports.getList = {
        'spec': {
            description: "Operations about rooms",
            path: "/rooms",
            method: "GET",
            summary: "Traverse through rooms list",
            notes: "Returns a room list",
            type: "RoomDisplayable",
            nickname: "getRoomList",
            produces: ["application/json"],
            parameters: [
                paramTypes.query(
                    'only_public',
                    'When this flag is true, list will contain only public rooms',
                    'boolean',
                    false,
                    null,
                    'false'
                )
            ],
            responseMessages: []
        },
        'action': function (req, res) {
            var query = {};

            if (req.query.only_public === 'true') {
                query.password = "";
            }

            Room.find(query, function (err, rooms) {
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

    exports.getById = {
        'spec': {
            description: "Operations about rooms",
            path: "/rooms/{roomId}",
            method: "GET",
            summary: "Get information about single room",
            type: "RoomDisplayable",
            nickname: "getRoomData",
            produces: ["application/json"],
            parameters: [],
            responseMessages: [
                swe.notFound()
            ]
        },
        'action': function (req, res) {
            Room.findById(req.params.roomId, function (err, room) {
                if (err) {
                    res.status(500).send('');
                }

                if (!room) {
                    res.status(404).send(swe.notFound());
                    return;
                }

                res.send(room);
            });
        }
    };

    exports.getUsers = {
        'spec': {
            description: "Operations about rooms",
            path: "/rooms/{roomId}/users",
            method: "GET",
            summary: "Get list of users in room",
            type: "UserDiplayable",
            nickname: "getRoomUsers",
            produces: ["application/json"],
            parameters: [],
            responseMessages: [
                swe.notFound()
            ]
        },
        'action': function (req, res) {
            Room.findById(req.params.roomId, function (err, room) {
                if (err) {
                    res.status(500).send('');
                }

                if (!room) {
                    res.status(404).send(swe.notFound());
                    return;
                }

                res.send(room.users);
            });
        }
    };

    exports.postUser = {
        'spec': {
            description: 'Operations about rooms',
            path: '/rooms/{roomId}/users',
            method: 'POST',
            summary: 'Join to the room',
            nickname: "joinToRoom",
            produces: ["application/json"],
            parameters: [
                paramTypes.path('roomId', 'Room id', 'number'),
                paramTypes.body('UserRef', 'Reference to user', 'UserRef')
            ],
            responseMessages: [
                swe.forbidden()
            ]
        },
        'action': function (req, res) {
            if (req.body.id !== req.user._id.toString()) {
                res.status(403).send(swe.forbidden());
                return;
            }

            var userId = new ObjectId(req.body.id);

            Room.findById(req.params.roomId, function (err, room) {
                if (err) {
                    res.status(500).send('');
                }

                if (!room) {
                    res.status(404).send(swe.notFound());
                    return;
                }

                room.users.push({
                    _id: userId,
                    username: 'Jeremy'
                });

                room.save(function (err) {
                    if (err) {
                        res.status(500).send('');
                    }

                    res.send({
                        id: req.body.id
                    });
                });
            });
        }
    };
})(module.exports);
