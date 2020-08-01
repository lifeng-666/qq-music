(function ($) {
    $.ajax({
        type: 'GET',
        url : '../mock/data.json',
        success: function (data) {
            window.data = data;
            window.curData = data[0];
            window.render();
        },
        error: function (err) {
            console.log('error');
        }
    })
})(window.Zepto)