define([
    'jquery'
    ], function($) {

        var isVisible = false,
            currentMessage = '',
            fadeTimeout,
            $errorWrapper = $('.error-container'),
            $errorContainer = $('.error-text');

        var show = function(message) {
            if (isVisible && message === currentMessage) {
                $errorWrapper.removeClass('blink-error').addClass('blink-error');
            } else {
                $errorWrapper.addClass('show');
                $errorContainer.text(message);
            }
            isVisible =true;
            clearTimeout(fadeTimeout);
            //fadeTimeout = setTimeout(hide, 2000);
        };

        var hide = function(e) {
            console.log('close');
            //clearTimeout(fadeTimeout);
            $errorWrapper.removeClass('show');
            $errorContainer.text('');
        }

        $errorWrapper.on('click', hide);

        return {
            show: show,
            hide: hide
        }
    }
);