(function ($) {
    var flag = false;
    var oImg = $('.img-box img');
    var oSong = $('.wrapper .song-info');
    var oLike = $('.control .like');
    var img;
    window.render = function () {
        window.curData.isLike && oLike.addClass('liking');
        oImg.attr('src', window.curData.image);
        if (! flag) {
            img = new Image();
            flag = true;
        } 
        img.src = window.curData.image;
        img.onload = function () {
            window.player.blurImg(img, $('body'));
        }
        var str = ' <div class="song-name">'+ window.curData.song +'</div>\
        <div>'+ window.curData.singer +'</div>\
        <div>' + window.curData.album +'</div>';
        oSong.html(str);
        window.renderAllTime(window.curData.duration);
    }
})(window.Zepto)