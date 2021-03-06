(function (module) {
    'use strict';

    module.exports = {
        models: {
            Room: {
                id: 'Room',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the category'
                    },
                    password: {
                        type: 'string',
                        description: 'Room password'
                    }
                }
            },

            RoomDisplayable: {
                id: 'RoomDisplayable',
                required: ['id', 'name', 'is_public'],
                properties: {
                    id: {
                        type: 'string',
                        description: ''
                    },
                    name: {
                        type: 'string',
                        description: 'Name of the category'
                    },
                    is_public: {
                        type: 'boolean',
                        description: 'True when room is secured with password'
                    }
                }
            },

            User: {
                id: 'User',
                required: ['username'],
                properties: {
                    username: {
                        type: 'string',
                        description: 'User public name'
                    }
                }
            },

            UserRef: {
                id: 'UserRef',
                required: ['id'],
                properties: {
                    id: {
                        type: 'string',
                        description: 'User id'
                    }
                }
            }
        }
    };
})(module);
