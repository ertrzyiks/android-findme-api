(function () {
    'use strict';

    var express = require('express'),
        app = require('./src/app.js');

    app.instance.use(express.static(__dirname + '/swagger-ui'));

    app.start()
        .then(function () {
            console.log('Listening on 3000');
        })
        .catch(function (err) {
            console.log(err);
        });
})();
