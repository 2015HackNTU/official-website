/**
 * Created by pilagod on 4/4/15.
 */
$(document).ready(function(){
    $('#top-nav').waypoint({
        handler: function(direction){
            if(direction === "down"){
//                $('#top-nav').removeClass('top-nav-before');
                $('#fb').css('font-size', '1.5em');
                $('#youtube').css('font-size', '1.5em');
                $('#top-nav-logo').addClass('top-nav-logo-after');
                $('#top-nav-hackntu').addClass('top-nav-hackntu-after');
                $('#top-nav').addClass('top-nav-after');

            }
            else{
                $('#top-nav').removeClass('top-nav-after');
                $('#fb').css('font-size', '2em');
                $('#youtube').css('font-size', '2em');
                $('#top-nav-logo').removeClass('top-nav-logo-after');
                $('#top-nav-hackntu').removeClass('top-nav-hackntu-after');
//                $('#top-nav').addClass('top-nav-before');
            }
        },
        offset: '-1%'
    });
    $('#bot-nav').waypoint({
        handler: function(direction){
            if(direction === "down"){
                $('#top-nav').addClass('navbar-hide');
                $('#navbar').removeClass('navbar-hide');
            }
            else{
                $('#top-nav').removeClass('navbar-hide');
                $('#navbar').addClass('navbar-hide');
            }
        }
    })
});