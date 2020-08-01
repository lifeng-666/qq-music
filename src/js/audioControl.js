(function (player) {
    player.status = 'pause';
    player.index = 0;
    player.next = function () {
        if (player.index === 2) {
            player.index = 0;
        } else {
            player.index ++;
        }
    }
    player.pre = function () {
        if (player.index === 0) {
            player.index = 2;
        } else {
            player.index --;
        }
    }
    player.changeStatus = function () {
        player.status = player.status === 'pause' ? 'playing' : 'pause';
    }
})(window.player)