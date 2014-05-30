define([
    'jquery'
    ], function($) {

        var isVisible = false,
            currentMessage = '',
            $errorWrapper = $('.error-container'),
            $errorContainer = $('.error-text'),
            fadeTimeout;

        var show = function(message) {
            if (isVisible && message === currentMessage) {
                $errorWrapper.removeClass('blink-error').addClass('blink-error');
            } else {
                $errorWrapper.addClass('show');
                $errorContainer.text(message);
            }
            isVisible =true;
            clearTimeout(fadeTimeout);
            fadeTimeout = setTimeout(hide, 2000);
        };

        var hide = function() {
            clearTimeout(fadeTimeout);
            $errorWrapper.removeClass('show');
            $errorContainer.text('');
        }

        return {
            show: show,
            hide: hide
        }
    }
);