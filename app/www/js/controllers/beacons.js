define([
    'jquery',
    'config'
    ], function($, config) {
        var beacon;
        var ranging = false;

        var init = function () {
            if (beacon === undefined) {
                beacon = createBeacon();
            }
            IBeacon.startMonitoringForRegion(beacon, onDidDetermineStateCallback);
            ranging = true;
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
                url: config.restServer + ':' + config.port + '/range/post',
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                crossDomain: true,
                cache: false,
                success: function (res) {
                    console.log('%j', res);
                },
                error: function (xhr, textStatus, err) {
                    if (xhr.status === 0) {
                        textStatus = 'Connection refused by server. Is the server running? ' + new Date();
                    }
                    $('.error-container').addClass('show');
                    $('.error-text').text(textStatus);
                }
            });
        };

        var stop = function() {
            IBeacon.stopMonitoringForRegion(beacon);
            ranging = false;
        };

        var isRanging = function() {
            return ranging;
        };

        return {
            init: init,
            stop: stop,
            isRanging: isRanging
        }
    }
);