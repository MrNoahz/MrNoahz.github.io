var scrolling = false;
var curPage   = 0;
var pages;
var stY;

var curSlider = 0; 
var sliding   = false;
var slider;

var pageids = [
	'home',
	'about',
	'work',
	'contact'
];

$(function() {
	pages = $('section');
	slider = $('#work .item');

 	/* Smooth Scrolling */
    $('a[href*="#"]:not([href="#"]').click(function() {
    	var targetid = $(this).attr('href');

    	curPage = pageids.indexOf(targetid.substring(1));
    	scrollTo($(targetid));

    	return false;
    });

    $('#nav_home').trigger('click');

    $(document).on("mousewheel DOMMouseScroll", function(e) {
    	if(!scrolling) {
    		if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0)
    			goUp();
    		else
    			goDown();
    	}
    });

    $(document).on("touchstart", function(event) {
    	stY = event.originalEvent.touches[0].screenY;
    });

    $(document).on("touchmove", function(event) {
    	event.preventDefault();

    	var curY = event.originalEvent.touches[0].screenY;

    	if(stY - curY > 50)
    		goDown();
    	else if(curY - stY > 50)
    		goUp();
    });

    $(document).on("keydown", function(event) {
    	if(event.keyCode == 40)
    		goDown();
    	else if(event.keyCode == 38)
    		goUp();
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
});

//TODO: Merge these two functions together.
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

function goUp() {
	if(curPage > 0 && !scrolling) {
		curPage--;
		page(curPage);
	}
}

function goDown() {
	if((curPage < pages.length - 1) && !scrolling) {
		curPage++;
		page(curPage);
	}
}

function page(page) {
	scrollTo($('#' + pageids[page]));

	scrolling = true;
}

function scrollTo(target) {
    if (target.length) {
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

	    $('html,body').animate(
	        { scrollTop: [target.offset().top, "swing"] }, //Change to transform; much better performance
	        900, 
	        function() { 
	            scrolling = false;
	        }
	    );
	}
}