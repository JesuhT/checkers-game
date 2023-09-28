$(document).ready(function () {
    const iframe = $('#checkers');
    const time = $('.time');
    const start = $('#gamestart');
    const cancel = $('#cancel');
    const play = $('#play');
    iframe.addClass('unclickable');
    time.hide();
    start.hide();
    cancel.hide();
    var clicked = false;
    $('#play').on('click', function () {
        
        if (!clicked) {
            $('.top').hide();
            $('.item').hide();
            play.show();
            time.show();
            start.show();
            clicked=true;
        } else {
            $('.top').show();
            $('.item').show();
            
            time.hide();
            start.hide();
            cancel.hide();
            clicked=false;
        }

    })

    start.on('click', function () {
        iframe.removeClass('unclickable');
        time.hide();
        start.hide();
        cancel.show();
        play.addClass('unclickable');
    })
    cancel.on('click', function () {
        time.show();
        start.show();
        cancel.hide();
        iframe.addClass('unclickable');
        iframe.attr('src', iframe.attr('src'));
        play.removeClass('unclickable');
    })

})