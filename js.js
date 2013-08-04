var slider;		// reference to slider
var $slides;	// holds individual slides
var $dots;		// hold reference to dots
var $arrows;	//holds reference to arrows
var $rightArrow;// holds reference to right arrow
var max;		// maximum number of slides in slideshow
var index;		// holds number representing active slide
var timer;		// timer for autoplay
var isAuto;		// checks to see if we should be autoplaying


	/**
		Kick starts the party!
	*/
function init(){
	// go get pointers
	$slider = $( '.slider' );
	$slides = $slider.find( '.slides li' );
	drawDots();
	drawArrows();
	$dots.eq ( 0 ).trigger ( 'click', true );
}

	/**
		Create dots or pagination
	*/
	function drawDots() {
		// create unordered list
		var $pagination = $( '<ul class="pagination"></ul>' );

		// create dot for each slide
		$slides.each(function (){
			$pagination.append( '<li>&bull;</li>' );
		});

		// add event to dots
		$pagination.on( 'click', 'li', slide );

		// add dots to slider
		$slider.append( $pagination );

		$dots = $pagination.children();
		// number of slides
		max = $dots.length;

		// center pagination
		$pagination.css( 'width', max * $dots.outerWidth() );
	}


/**
	Creates arrows
*/
function drawArrows() {

	$arrows = $(
		'<div class="arrow right-arrow"></div>' +
		'<div class="arrow left-arrow"></div>'
	)
	.hover ( fadeArrow )
	.click( triggerSlide );

	$rightArrow = $arrows.eq( 0 );
	
	$slider.append( $arrows )
		.hover( toggleArrows )

}



/**
	Makes slides animate in and out
*/
function slide ( event, wasTriggered ) {

	var $this = $( this );

	isAuto = wasTriggered;

	if ( !isAuto ) {
		clearTimeout( timer );
	}

	// grabs click dot's index #
	index = $this.index();

	// get reference to slide that needs to fade in
	// and stop all current animations
	$slides.stop().eq( index )
		// fade in that reference
		.fadeTo( 500, 1, postSlide )
		// fade out all siblings
		.siblings().fadeTo( 500, 0 );

	// animate clicked dot to color
	$this.stop().animate({
		color : 'teal'
	}, 500 )
	// animate all siblings back to black
	.siblings().stop().animate({
		color : '#ccc'
	}, 500 );

}



/**
	Fades arrows in and out
*/
function toggleArrows ( event ) {

	var opacity = 0;

	if ( event.type === 'mouseenter' ){
		opacity = 0.5;
	}

	$arrows.stop().fadeTo( 250, opacity ); 

}



/**
	Fades arrow in to 75%
*/
function fadeArrow ( event ) {

	var opacity = 0.5;
	// stop event bubbling
	event.stopPropagation();

	if ( event.type === 'mouseenter' ) {
		opacity = 0.75;
	}

	$( this ).stop().fadeTo( 250, opacity );

}



/**
	Functionality for arrows
*/
function triggerSlide( event, wasTriggered ){

	var isLeftArrow = $( this ).hasClass( 'left-arrow' );
	var newIndex;

	if ( isLeftArrow ) {

		if ( index === 0 ) {
			newIndex = max - 1;
		}  else {
			newIndex = index - 1;
		}

	} else {

		if ( index === max - 1 ) {
			newIndex = 0;
		} else {
			newIndex = index + 1;
		}
	
	}

	$dots.eq( newIndex ).trigger( 'click', wasTriggered );

}


/**
Animations that occur AFTER the initial animation
*/
function postSlide (){

	var $this = $( this );

	$this.children( 'p' ).animate({
		bottom : '0px',
		opacity : 1
	}, 500 );

	$this.siblings().children( 'p' ).css({
		bottom : '-50px',
		opacity : 0
	});

	if ( isAuto ) {
		autoPlay( 5000 );
	} else {
		autoPlay( 10000 );
	}
}



/**
	Autoplays slides
*/
function autoPlay( time ) {

	timer = setTimeout(function(){

		$rightArrow.trigger( 'click', true );

	}, time );

}



$( 'html' ).addClass( 'js' );
// calls init function once document is ready
$( document ).ready( init );






