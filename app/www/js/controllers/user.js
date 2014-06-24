define([
    'jquery',
    'config'
    ], function($, config) {
        var user;

        var getUser = function (deviceID, successCallback, errorCallback) {
            $.ajax({
                url: config.restServer + ':' + config.port + '/user/' + deviceID + '/get',
                type: "GET",
                contentType: "application/json",
                crossDomain: true,
                cache: false,
                success: function (res, textStatus, xhr) {
                    if (xhr.status === 200) {
                        var user = res;
                        successCallback(res);
                    } else if (xhr.status === 204) {
                        errorCallback('Device not found. Enter new username');
                    } else {
                        errorCallback(textStatus);
                    }
                },
                error: function (xhr, textStatus, err) {
                    if (xhr.status === 0) {
                        textStatus = 'Connection refused by server. Is the server running? ' + new Date();
                    }
                    errorCallback(textStatus);
                }
            });
        };

        var putUser = function(deviceID, username, practice, successCallback, errorCallback) {
            $.ajax({
                url: config.restServer + ':' + config.port + '/user/put',
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify({
                    'deviceid': deviceID,
                    'username': username,
                    'practice': practice
                }),
                crossDomain: true,
                cache: false,
                success: function(res, textStatus, xhr) {
                    if (xhr.status === 200) {
                        user = {
                            'deviceid': deviceID,
                            'username': username,
                            'practice': practice
                        };
                        successCallback(user);
                    } else {
                        errorCallback(textStatus);
                    }
                },
                error: function (xhr, textStatus, err) {
                    if (xhr.status === 0) {
                        textStatus = 'Connection refused by server. Is the server running? ' + new Date();
                    }
                    errorCallback(textStatus);
                }
            });
        };

        return {
            getUser: getUser,
            putUser: putUser
        }
    }
);