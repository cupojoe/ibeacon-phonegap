define([
    'jquery'
    ], function($) {
        var getUser = function (deviceID, successCallback, errorCallback) {
            console.log(deviceID);
            $.ajax({
                url: 'http://ec2-54-200-154-201.us-west-2.compute.amazonaws.com:8080/user/' + deviceID + '/get',
                type: "GET",
                contentType: "application/json",
                crossDomain: true,
                cache: false,
                success: function (res, textStatus, xhr) {
                    if (xhr.status === 200) {
                        successCallback(res);
                    } else {
                        errorCallback(textStatus);
                    }
                },
                error: errorCallback
            });
        };

        var putUser = function(deviceID, username, successCallback, errorCallback) {
            $.ajax({
                url: 'http://ec2-54-200-154-201.us-west-2.compute.amazonaws.com:8080/user/put',
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify({
                    'deviceid': deviceID,
                    'username': username
                }),
                crossDomain: true,
                cache: false,
                success: function(res, textStatus, xhr) {
                    if (xhr.status === 200) {
                        successCallback({
                            'deviceid': deviceID,
                            'username': username
                        });
                    } else {
                        errorCallback(textStatus);
                    }
                },
                error: errorCallback
            });
        };

        return {
            getUser: getUser,
            putUser: putUser
        }
    }
);