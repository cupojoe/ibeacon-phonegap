define([
    'jquery',
    'config'
    ], function($, config) {
        var region = {
            uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
            major: 15676,
            minor: 51068,
            name: 'Office'
        };
        var ranging = false;

        var init = function () {
            console.log('init EstimoteBeacons');
            window.EstimoteBeacons.startMonitoringForRegion(region.uuid, region.major, region.minor,
                onDidDetermineStateCallback,
                function() {
                    ranging = false;
                    console.log('Error while starting monitoring for region ' + region.uuid);
                    console.log(arguments);
                }
            );
            ranging = true;
            $('.logo').addClass('blink');
        };

        var onDidDetermineStateCallback = function (result) {
            console.log(result);
            var data = {
                'uuid' : region.uuid,
                'major' : region.major,
                'minor' : region.minor,
                'region' : region.name,
                'uid' : window.device.uuid,
                'date': Date.now(),
                'state': result.action
            }
            $.ajax({
                url: config.restServer + ':' + config.port + '/range/post',
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json",
                crossDomain: true,
                cache: false,
                success: function (res) {
                    console.log('Status update successfull');
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
            $('.logo').removeClass('blink');
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