(function () {
    'use strict';

    var express = require('express'),
        app = require('./src/app.js');

    app.instance.use(express.static(__dirname + '/swagger-ui'));

    app.start()
        .then(function (server, port) {
            console.log('Listening on ' + port);
        })
        .catch(function (err) {
            console.log(err);
        });
})();
