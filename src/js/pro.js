(function ($) {
    var allTime = $('.pro .all-time');
    window.renderAllTime = function (time) {
        var m = Math.floor(time / 60);
        var s = time % 60;
        s = s < 10 ? '0' + s : s;
        allTime.html('0' + m + ':' + s);
    }
})(window.Zepto)