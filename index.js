(function () {
    'use strict';

    var app = require('./src/app.js');
    app.start()
        .then(function () {
            console.log('Listening on 3000');
        })
        .catch(function (err) {
            console.log(err);
        });
})();
