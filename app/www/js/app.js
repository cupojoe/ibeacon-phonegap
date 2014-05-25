define([
    'jquery'
    ], function($) {
        // Application Constructor
        var initialize = function() {
            console.log('init');
            bindEvents();
        };
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        var bindEvents = function() {
            document.addEventListener('deviceready', onDeviceReady, false);
        };
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        var onDeviceReady = function() {
            receivedEvent('deviceready');
        };
        // Update DOM on a Received Event
        var receivedEvent = function(id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            var beacon = createBeacon();
            IBeacon.startMonitoringForRegion(beacon, onDidDetermineStateCallback);
        };
        var createBeacon = function() {
            var identifier = 'Estimote'; // optional
            var major = 15676; // optional
            var minor = 51068; // optional
            var uuid = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'; // mandatory

            // throws an error if the parameters are not valid
            var beacon = new IBeacon.CLBeaconRegion(uuid, major, minor, identifier);
            return beacon;
        };
        var onDidDetermineStateCallback = function (result) {
            var data = {
                'uuid' : 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
                'major' : 15676,
                'minor' : 51068,
                'region' : 'Region 1',
                'uid' : window.device.uuid,
                'date': Date.now(),
                'state': result.state
            }
            $.ajax({
                url: 'http://10.0.1.25:8080/ranging/enter',
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                crossDomain: true,
                cache: false,
                success: function (res) {
                    console.log('%j', res);
                },
                error: function (er) {
                    console.log('%j', er);
                }
            });
        };

        return {
            init: initialize
        }
    }
);
