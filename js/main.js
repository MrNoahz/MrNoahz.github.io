var curSlider = 0; 
var sliding   = false;
var slider;

var pageIds = [
	"home",
	"about",
	"work",
	"contact"	
];

$(function() {
	slider = $('#work .item');

 	/* Smooth Scrolling */
    $(function() {
	  $('a[href*="#"]:not([href="#"])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: [target.offset().top, "swing"]
	        }, 900,
	        function() {
	        	scrollListen();
	        });

	        return false;
	      }
	    }
	  });
	});

    $(document).on('mousewheel DOMMouseScroll', function(e) {
    	scrollListen();
    });

    $(document).on("touchmove", function(event) {
    	scrollListen();
    });

    $(document).on("keydown", function(event) {
    	var k = event.keyCode;

    	if(k == 40 || k == 38)
    		scrollListen();
    });

    $('#work .left').click(function(event) {
    	if(!sliding) {		
    		goLeft();
    	}
    });

    $('#work .right').click(function(event) {
    	if(!sliding) {
    		goRight();
    	}
    });

    scrollListen();
});

function elementIsFocused(elem) {
	var elemTop    = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	var centernav = $('.nav-panel').offset().top + ($('.nav-panel').height() / 2);

	return (elemTop <= centernav && elemBottom >= centernav);
}

function scrollListen() {
	for(var i = 0; i < pageIds.length; i++) {
		if(elementIsFocused('#' + pageIds[i])) {
			scrollThings(i);
			break;
		}
	}
}

function scrollThings(curPage) {
	if(curPage != 0) {
		$('nav').removeClass('slideInDown').addClass('slideOutUp');
		$('.nav-panel').removeClass('hidden');
    } else {
		$('nav').removeClass('slideOutUp').addClass('slideInDown');
		$('.nav-panel').addClass('hidden');
    }

    if(curPage == 3 || curPage == 2)
       	$('.nav-panel').addClass('white');
    else
       	$('.nav-panel').removeClass('white');
        

    if(curPage == 1 || curPage == 3)
    	$('.hamburgermenu').addClass('black');
    else
    	$('.hamburgermenu').removeClass('black');

    $('.nav-panel ul li').removeClass('active');
    $('.nav-panel ul li:nth-child(' + (curPage + 1) + ')').addClass('active');
}

//TODO: Use animation end listener
function goLeft() {
	if(curSlider > 0) {
		curSlider--;

		$('#work .arrow.right').removeClass('inactive');
		if(curSlider == 0)
			$('#work .arrow.left').addClass('inactive');

		slideSlider('+');
	}
}

function goRight() {
	if(curSlider < slider.length - 1) {
		curSlider++;

		$('#work .arrow.left').removeClass('inactive');
		if(curSlider == slider.length - 1)
			$('#work .arrow.right').addClass('inactive');

		slideSlider('-');
	}
}

function slideSlider(direction) {
	console.log(sliding);
	sliding = true;

	var slide = 0;

	slider.animate(
		{ 
			left: (direction + '=') + $('#work .laptop .screen').parent().width() + "px"
		}, 
		500, 
		function() {
			if(slide++ == slider.length - 1) {
				setTimeout(function() { sliding = false }, 400);
				console.log('done');
			}
		});
}

// function scrollTo(target) {
//     if (target.length) {
//         if(curPage != 0) {
// 			$('nav').removeClass('slideInDown').addClass('slideOutUp');
// 			$('.nav-panel').removeClass('hidden');
//         } else {
// 			$('nav').removeClass('slideOutUp').addClass('slideInDown');
// 			$('.nav-panel').addClass('hidden');
//         }

//         if(curPage == 3 || curPage == 2)
//         	$('.nav-panel').addClass('white');
//         else
//         	$('.nav-panel').removeClass('white');
        

//         if(curPage == 1 || curPage == 3)
//         	$('.hamburgermenu').addClass('black');
//         else
//         	$('.hamburgermenu').removeClass('black');

//         $('.nav-panel ul li').removeClass('active');
//         $('.nav-panel ul li:nth-child(' + (curPage + 1) + ')').addClass('active');

// 	    $('html,body').animate(
// 	        { scrollTop: [target.offset().top, "swing"] }, //Change to transform; much better performance
// 	        900, 
// 	        function() { 
// 	            scrolling = false;
// 	        }
// 	    );
// 	}
// }