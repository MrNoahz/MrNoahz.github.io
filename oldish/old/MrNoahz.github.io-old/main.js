var iAmOptions = ["Noah", "a developer", "a student", "creative"];
var iAmPos = 0;

$(".button-collapse").sideNav();

$(function() {
  	$('a[href*=#]:not([href=#])').click(function() {
    	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    		var target = $(this.hash);
    	  	target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    	  	if (target.length) {
    	    	$('html,body').animate({ scrollTop: target.offset().top }, 1000);
    	    	return false;
    	  	}
    	}
  	}); 

  	typeLoop();
  	setInterval('cursorAnimation()', 600);
});

function typeLoop() {
	$("#typing").typeTo(iAmOptions[iAmPos]);
	if(iAmPos >= iAmOptions.length - 1)
		iAmPos = 0;
	else 
		iAmPos++;

	setTimeout('typeLoop()', 3000);
}

function cursorAnimation() {
	$('#cursor').animate({
		opacity: 0
	}, 'fast', 'swing').animate({
		opacity: 1
	}, 'fast', 'swing');
}

function email() {
    window.open('mailto:noahzgames@gmail.com?subject=subject&body=body');
}

function notAvailable() {
    alert('Not currently available');
}