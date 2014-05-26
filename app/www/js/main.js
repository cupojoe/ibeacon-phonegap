/*
*   main.js
*   This file is where all scripts will be configured and/or imported
*/

'use strict';
require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        app: 'app',
        localstorage: 'localstorage',
        userController: 'controllers/user',
        userView: 'views/user',
        beaconController: 'controllers/beacons'
    },
    shim: {
        app: {
            deps: ['jquery']
        }
    }
});

require(['app', 'jquery'], function (app, $) {
    // use app here
    console.log('App about to start');
    app.init();
});
