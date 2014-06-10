define([
    'jquery',
    'config'
    ], function($, config) {
        function getPractices(successCallback, errorCallback) {
            $.ajax({
                url: config.restServer + ':' + config.port + '/practices/get',
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
                error: function (xhr, textStatus, err) {
                    if (xhr.status === 0) {
                        textStatus = 'Connection refused by server. Is the server running? ' + new Date();
                    }
                    errorCallback(textStatus);
                }
            });
        };

        return {
            getPractices: getPractices
        }
    }
);