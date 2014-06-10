define([
    'jquery',
    'userController',
    'beaconController',
    'userView',
    'config',
    'fastclick',
    'error'
], function($,
    userController,
    beaconController,
    userView,
    config,
    Fastclick,
    error
    ) {

        // Application Constructor
        function initialize() {
            bindEvents();
        };
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        function bindEvents() {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                document.addEventListener('deviceready', onDeviceReady, false);
                document.addEventListener("offline", onNetworkDisconnect, false);
                document.addEventListener("online", onNetworkConnect, false);
            } else {
                window.device = {
                    uuid: "71EF5A2C-44A8-4F2C-BB75-F023752AEA70"
                };
                onDeviceReady();
                //onUserGetError();
            }
        };

        // deviceready Event Handler
        function onDeviceReady() {
            /*localstorage.getUserData(function(results) {
                console.log('User data results');
                console.log(results);
                if (results === undefined) {
                    localstorage.setUserData(window.device.uuid, 'Pepito');
                }
            });*/
            if (parseInt(window.device.version) === 7) {
                $('body').addClass('ios7');
            }
            if (navigator.connection.type !== Connection.NONE) {
                onNetworkConnect();
            }
            FastClick.attach(document.body);
            console.log("DEVICE ID: " + window.device.uuid);
        };

        function onNetworkConnect() {
            error.hide();
            userController.getUser(window.device.uuid, onUserFound, onUserGetError);
        };

        function onNetworkDisconnect() {
            error.show('No network connection');
            if (beaconController.isRanging()) {
                beaconController.stop();
            }
        };

        function onUserFound(res) {
            userView.init(res);
            userView.populateFormControl();
            userView.viewIn();
            if (!beaconController.isRanging()) {
                beaconController.init();
            }
        };

        function onUserGetError(err) {
            error.show(err);
            userView.prepareForEdit();
            userView.viewIn();
            if (beaconController.isRanging()) {
                beaconController.stop();
            }
        };

        return {
            init: initialize
        }
    }
);
