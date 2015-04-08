/**
 * Created by pilagod on 4/4/15.
 */
$(document).ready(function(){

    $('#navbar>nav').addClass('navbar-hide');

    $('#top-anchor').waypoint({
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
    $('#bot-nav').waypoint({
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

    //$.waypoints('refresh');

//    $('#nav-anchor').waypoint({
//        handler: function(direction){
//            if(direction === "up"){
//                $('#top-nav').removeClass('navbar-hide');
//            }
//        }
//    })
});
