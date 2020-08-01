(function ($) {
    var oBox = $('.img-box');
    var deg = 0;
    var timer = null;
    window.start = function () {
        timer = setInterval(function () {
            oBox.css({
                transform: 'rotateZ(' + deg + 'deg)'
            })
            deg += 1;
            deg = deg % 360;
        }, 70)
    }
    window.end = function () {
        clearInterval(timer);
    }
})(window.Zepto)