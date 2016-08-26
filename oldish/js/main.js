$(function() {

    /* Smooth Scrolling */
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({scrollTop: target.offset().top}, 1000);
                return false;
            }   
        }
    });

    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var animations = [[$('#about p'), "fadeInUp"], [$('.itemlist a'), 'fadeInUp'], [$('.skilllist .item'), 'fadeInUp']];
    if(!mobile) {
        for(var i = 0; i < animations.length; i++) {
            animations[i][0].addClass('noshow')
                            .viewportChecker({
                                classToAdd: "visible animated " + animations[i][1],
                                offset: 200
                            });
        }
        $("#about p").viewportChecker({
            classToAdd: "visible animated fadeInUp",
            offset: 200
        });
    }


  //$('#home:before')
    //.css('background', 'url("../pic/bg.jpg") no-repeat center center scroll')
    // .waitForImages(function() {
    //   console.log("Testt");
    //   alert("test");
    // }, $.noop, true);
});