define([
    'jquery',
    'userController',
    'practicesController',
    'beaconController'
    ], function($, controller, practicesController, beaconController) {
        var data,
            practices;

        function init(userdata) {
            data = userdata;
        };

        function populateFormControl() {
            console.log('populateFormControl');
            if (typeof data !== 'undefined') {
                $('.username-edit-field').addClass('show');
                $('.user-form').removeClass('show');
                $('.edit-field .form-control').val(data.username);
                $('.edit-btn').on('click', onEdit);
                $('.send-btn').off('click', onSend);
                $('.cancel-btn').off('click', populateFormControl);
            }
        };

        function prepareForEdit() {
            $('.username-edit-field').removeClass('show');
            if (typeof practices === 'undefined') {
                $('.loader').addClass('show');
                practices = [];
                practicesController.getPractices(loadPractices, showRetryMessage);
            } else {
                showEditForm();
            }
        };

        function loadPractices(results) {
            practices = results;
            var $select = $('#practice-select');
            for (var i=0; i<results.length; i++) {
                $select.append($('<option></option>').attr('value', results[i].name).text(results[i].name));
            }
            showEditForm();
        };

        function showEditForm() {
            if (typeof data !== 'undefined') {
                $('.username-field > .form-control').val(data.username);
                $('#practice-select').val(data.practice);
            }
            $('.loader').removeClass('show');
            $('.user-form').addClass('show');
            $('.send-btn').on('click', onSend);
            $('.cancel-btn').off('click', populateFormControl);
            $('.edit-btn').off('click', onEdit);
        };

        function showRetryMessage() {
            practices = undefined;
        };

        function onEdit(e) {
            prepareForEdit();
        };

        function onSend(e) {
            e.preventDefault();
            controller.putUser(window.device.uuid, $('.username-field > .form-control').val(), $('#practice-select').val(),
                function(res) {
                    data.username = $('.username-field > .form-control').val();
                    data.practice = $('#practice-select').val();
                    populateFormControl();
                    beaconController.init();
                },
                function(err) {
                    error.show(err);
                }
            );
        };

        function viewIn() {
            $('#app-container').addClass('fade-in');
        };

        function viewOut() {
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