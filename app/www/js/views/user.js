define([
    'jquery',
    'userController',
    'beaconController'
    ], function($, controller, beaconController) {
        var data;

        var init = function(_userdata) {
            data = _userdata;
        };

        var populateFormControl = function() {
            console.log('populateFormControl');
            if (data !== undefined) {
                $('.form-control').val(data.username);
                $('.edit-send-icon').removeClass('fa-send').addClass('fa-edit');
                $('.username-field').removeClass('center');
                $('.form-control').attr('disabled', 'disabled');
                $('.edit-send-btn').off('click', onSend);
                $('.edit-send-btn').on('click', onEdit);
            }
            beaconController.init();
        };

        var prepareForEdit = function() {
            $('.edit-send-icon').removeClass('fa-edit').addClass('fa-send');
            $('.username-field').addClass('center');
            $('.form-control').removeAttr('disabled');
            $('.edit-send-btn').on('click', onSend);
            $('.edit-send-btn').off('click', onEdit);
            $('.form-control').focus();
        };

        var onEdit = function(e) {
            prepareForEdit();
        };

        var onSend = function(e) {
            controller.putUser(window.device.uuid, $('.form-control').val(),
                function(res) {
                    data = res;
                    populateFormControl();
                },
                function(err) {
                    console.log('Error while sending username to the server: ' + err);
                }
            );
        };

        var viewIn = function () {
            $('#app-container').addClass('fade-in');
            $('.logo').addClass('blink');
        };

        var viewOut = function () {
            $('#app-container').removeClass('fade-in');
        };

        return {
            init: init,
            populateFormControl: populateFormControl,
            prepareForEdit: prepareForEdit,
            viewIn: viewIn,
            viewOut: viewOut
        }
    }
);