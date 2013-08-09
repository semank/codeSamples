$('#nametext').click(function(){
    $(this).addClass('animated hinge')
});

setTimeout(function() {
    $('#nametext').removeClass('animated hinge');
}, 100);