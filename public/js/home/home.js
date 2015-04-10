/**
 * Created by pilagod on 4/4/15.
 */
$(document).ready(function(){

    var windowResize={
        width:0,
        init:function() {
            this.width=$(window).width();
        },
        checkResize:function(callback) {
            if( this.width!=$(window).width() ) {
                callback.apply();
            }
        }
    };

    windowResize.init();

    $(window).on('resize', function(){
        //alert(window.document.width);
        windowResize.checkResize(function(){
            if($(window).width() <= 638){
                top_anchor_waypoint.disable();
                bot_anchor_waypoint.disable();
            }
            else{
                top_anchor_waypoint.enable();
                bot_anchor_waypoint.enable();
            }
        })
    });

    var top_anchor_waypoint = new Waypoint({
        element: $('#top-anchor'),
        handler: function(direction){
            if(direction === "down"){
//                $('#top-nav').removeClass('top-nav-before');
                $('#fb-icon').css('font-size', '1.5em');
                $('#youtube-icon').css('font-size', '1.5em');
                $('#top-nav-logo').addClass('top-nav-logo-after');
                $('#top-nav-hackntu').addClass('top-nav-hackntu-after');
                $('#top-nav').addClass('top-nav-after');
            }
            else{
                $('#top-nav').removeClass('top-nav-after');
                $('#fb-icon').css('font-size', '2em');
                $('#youtube-icon').css('font-size', '2em');
                $('#top-nav-logo').removeClass('top-nav-logo-after');
                $('#top-nav-hackntu').removeClass('top-nav-hackntu-after');
//                $('#top-nav').addClass('top-nav-before');
            }
        }
    });

    var bot_anchor_waypoint = new Waypoint({
        element: $('#bot-anchor'),
        handler: function(direction){
            if(direction === "down"){
                $('#top-nav').addClass('navbar-hide');
                //$('#navbar').removeClass('navbar-hide');
                $('#navbar>nav').removeClass('navbar-hide');
            }
            else{
                $('#top-nav').removeClass('navbar-hide');
                //if(!$('#youtube-div').hasClass('show'))
                //    $('#navbar').addClass('navbar-hide');
                $('#navbar>nav').addClass('navbar-hide');
            }
        }
    });

    if($(window).width() > 638) {
        //alert(navigator.userAgent.toLowerCase().indexOf('chrome'));
        if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){
            alert('chrome');
            if(window.pageYOffset < $('#bot-anchor').offset().top){
                alert('test');
                $('#navbar>nav').addClass('navbar-hide');
            }
            else{
                $('#navbar>nav').removeClass('navbar-hide');
            }
        }else{
            $('#navbar>nav').addClass('navbar-hide');
        }
    }else {
        top_anchor_waypoint.disable();
        bot_anchor_waypoint.disable();
    }







});
