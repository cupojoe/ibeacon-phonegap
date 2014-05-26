define([
    'jquery',
    'userController',
    'userView'
    ], function($, userController, userView) {

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
            } else {
                window.device = {
                    uuid: "71EF5A2C-44A8-4F2C-BB75-F023752AEA70"
                };
                onDeviceReady();
            }
        };

        // deviceready Event Handler
        var onDeviceReady = function() {
            if (parseInt(window.device.version) === 7) {
                $('body').addClass('ios7');
            }
            userController.getUser(window.device.uuid, onUserFound, onUserGetError);
        };

        var onUserFound = function(res) {
            userView.init(res);
            userView.viewIn();
            userView.populateFormControl();
        };

        var onUserGetError = function(err) {
            console.log(err);
            userView.prepareForEdit();
            userView.viewIn();
        };

        return {
            init: initialize
        }
    }
);
