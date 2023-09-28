$(document).ready(function () {
    const body = $('#body');
    const iframe = $('#checkers');
    const time = $('.time');
    const start = $('#gamestart');
    const cancel = $('#cancel');
    const play = $('#play');
    const playbox = $('#play-box');
    const msg = $('#message');
    const ok = $('#ok');
    const gsmall = $('#green-small');
    gsmall.addClass('unclickable');
    iframe.addClass('unclickable');
    playbox.addClass('unclickable');
    time.hide();
    start.hide();
    cancel.hide();

    ok.on('click', function () {
        msg.fadeOut(10);

        playbox.removeClass('unclickable');

    })
    var clicked = false;
    $('#play').on('click', function () {

        if (!clicked) {
            $('.top').hide();
            $('.item').hide();
            play.show();
            time.show();
            start.show();
            clicked = true;
        } else {
            $('.top').show();
            $('.item').show();

            time.hide();
            start.hide();
            cancel.hide();
            clicked = false;
        }

    })

    start.on('click', function () {
        iframe.removeClass('unclickable');
        time.hide();
        start.hide();
        cancel.show();
        play.addClass('unclickable');
        iframe.removeClass('blur');
    })
    cancel.on('click', function () {
        time.show();
        start.show();
        cancel.hide();
        iframe.addClass('unclickable');
        iframe.attr('src', iframe.attr('src'));
        play.removeClass('unclickable');
        iframe.addClass('blur');
    })
    function cancelar() {
        time.show();
        start.show();
        cancel.hide();
        iframe.addClass('unclickable');
        iframe.attr('src', iframe.attr('src'));
        play.removeClass('unclickable');
    }
    window.addEventListener('nombreDelEvento', function () {
        cancelar();
    });

});