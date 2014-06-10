/*
*   main.js
*   This file is where all scripts will be configured and/or imported
*/

'use strict';
require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        fastclick: '../bower_components/fastclick/lib/fastclick',
        app: 'app',
        //localstorage: 'localstorage',
        userController: 'controllers/user',
        practicesController: 'controllers/practices',
        userView: 'views/user',
        beaconController: 'controllers/beacons',
        config: 'config/app-config',
        error: 'views/error'
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
