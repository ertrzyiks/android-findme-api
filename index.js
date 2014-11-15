(function () {
    'use strict';

    var app = require('./src/app.js');

    app.start()
        .then(function () {
            app.clearDatabase();

            console.log('Listening on 3000');
        })
        .catch(function (err) {
            console.log(err);
        });
})();
