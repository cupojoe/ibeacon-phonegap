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
        var STATES = {
            EXIT: 'exit',
            ENTER: 'enter',
            UNKNOWN: 'unknown'
        }
        var ranging = false,
            state = STATES.EXIT;

        var init = function () {
            console.log('init EstimoteBeacons');
            window.EstimoteBeacons.startMonitoringForRegion(region.uuid, region.major, region.minor,
                onDidDetermineStateCallback,
                function() {
                    ranging = false;
                    console.log('Error while starting monitoring for region ' + region.uuid);
                    console.log(arguments);
                },
                true
            );
            ranging = true;
            $('.logo').addClass('blink');
        };

        var onDidDetermineStateCallback = function (result) {
            if (result.action !== state) {
                // window.plugin.notification.local.add({
                //     id:         'range', // a unique id of the notifiction
                //     date:       Date.now(),   // this expects a date object
                //     message:    'Satet is: ' + result.action, // the message that is displayed
                //     title:      'State changed', // the title of the message
                //     badge:      1 // displays number badge to notification
                // });
                //window.plugin.notification.local.add({ message: 'State change: ' + result.action });

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
                        state = result.action;
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
            } else {
                console.log('State change detected, but results were the same as stored.');
            }
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