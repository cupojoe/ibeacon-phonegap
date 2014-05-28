define([
    'jquery',
    'userController',
    'beaconController',
    'userView',
    'config',
    'fastclick'
    ], function($, userController, beaconController, userView, config, Fastclick) {

        // Application Constructor
        var initialize = function() {
            bindEvents();
        };
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        var bindEvents = function() {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                document.addEventListener('deviceready', onDeviceReady, false);
                document.addEventListener("offline", onNetworkDisconnect, false);
                document.addEventListener("online", onNetworkConnect, false);
            } else {
                window.device = {
                    uuid: "71EF5A2C-44A8-4F2C-BB75-F023752AEA70"
                };
                onDeviceReady();
                onUserGetError();
            }
        };

        // deviceready Event Handler
        var onDeviceReady = function() {
            if (parseInt(window.device.version) === 7) {
                $('body').addClass('ios7');
            }
            if (navigator.connection.type !== Connection.NONE) {
                onNetworkConnect();
            }
            FastClick.attach(document.body);
        };

        var onUserFound = function(res) {
            userView.init(res);
            userView.viewIn();
            userView.populateFormControl();
            if (!beaconController.isRanging()) {
                beaconController.init();
            }
        };

        var onUserGetError = function(err) {
            $('.error-container').addClass('show');
            $('.error-text').text(err);
            userView.prepareForEdit();
            userView.viewIn();
            if (beaconController.isRanging()) {
                beaconController.stop();
            }
        };

        var onNetworkDisconnect = function() {
            $('.error-container').addClass('show');
            $('.error-text').text('No network connection');
            if (beaconController.isRanging()) {
                beaconController.stop();
            }
        };
        var onNetworkConnect = function() {
            $('.error-container').removeClass('show');
            userController.getUser(window.device.uuid, onUserFound, onUserGetError);
        };

        return {
            init: initialize
        }
    }
);
