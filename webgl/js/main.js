$(function () {     
            $("#mybook").booklet();
        });

$('#title').mouseover(function(){
   $(this).addClass('animated');
	setTimeout(function() {
   $('#title').removeClass('animated');
}, 2500);
});