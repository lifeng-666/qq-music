(function ($) {
    var oAudio = document.querySelector('.wrapper audio');
    var oNext = $('.control .next');
    var oPre = $('.control .prev');
    var oPlay = $('.control .play');
    var oList = $('.control .list');
    var songList = $('.song_list');
    var listClose = $('.song_list .list_close');
    var listArr = $('.song_list .song-index');
    var proTop = $('.pro-top');
    var curTime = $('.cur-time');
    var clickBar = $('.pro-wrap');
    var flag = false;
    var timer = null;
    var step = 0;
    var allStep = -255;
    var sec = 0;
    var minute = 0;
    var bit = 0
    function proBar () {
        clearInterval(timer);
        step = 251 / window.curData.duration;
        timer = setInterval(function () {
            if (allStep >= -6) {
                clearInterval(timer);
                oNext[0].click();
            };
            allStep += step;
            proTop.css({
                'left': allStep + 'px'
            })
            sec ++;
            if (sec === 60) {
                bit ++;
                sec = 0;
            }
            sec = sec > 9 ? sec : '0' + sec;
            minute = '0' + bit;
            curTime.html(minute + ':' + sec);
        }, 1000)
    }
    function isPlay () {
        if (window.player.status === 'pause') {
            if (! flag) {
               oAudio.src = window.curData.audio;
               flag = true;
            }
            oAudio.play();
            window.start();
            oPlay.addClass('playing');
            proBar();
         } else {
             oAudio.pause();
             oPlay.removeClass('playing');
             window.end();
             clearInterval(timer);
         }
         window.player.changeStatus();
    }
    oPlay.click(function () {
        isPlay();
    })
    oPre.click(function () {
        sec = 0;
        minute = 0;
        bit = 0;
        window.player.pre();
        window.curData = window.data[window.player.index];
        step = 0;
        allStep = -255;
        window.render();
        oAudio.src = window.curData.audio;
        if (window.player.status === 'playing') {
            oAudio.play();
            proBar();
        }
    })
    oNext.click(function () {
        window.player.next();
        window.curData = window.data[window.player.index];
        sec = 0;
        minute = 0;
        bit = 0;
        step = 0;
        allStep = -255;
        window.render();
        oAudio.src = window.curData.audio;
        if (window.player.status === 'playing') {
            oAudio.play();
            proBar();
        }
    })
    oList.click(function () {
        songList.css({
            'top': '422px'
        })
    })
    listClose.click(function () {
        songList.css({
            'top': '670px'
        })
    })
    listArr.each(function (index) {
       $(this).click(function () {
           if (index === window.player.index) {
               if (window.player.status === 'pause') {
                   isPlay();
                   proBar();
               } else {
                   return;
               }
           } else {
                window.player.index = index;
                window.curData = window.data[window.player.index];
                sec = 0;
                minute = 0;
                bit = 0;
                step = 0;
                allStep = -255;
                window.render();
                oAudio.src = window.curData.audio;
                oAudio.play();
                proBar();
           }
       })
    })
    clickBar.click(function (e) {
        var loc = e.layerX;
        var curTime = (window.curData.duration / 250) * loc;
        curTime = Math.floor(curTime);
        oAudio.src = window.curData.audio;
        oAudio.currentTime = curTime;
        window.player.status = 'playing';
        allStep = -255 + loc;
        sec = curTime % 60;
        bit = Math.floor(curTime / 60);
        proBar();
        oAudio.play();
        oPlay.addClass('playing');
    })
})(window.Zepto)