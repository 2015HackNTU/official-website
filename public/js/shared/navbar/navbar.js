/**
 * Created by pilagod on 4/7/15.
 */

$(document).ready(function(){
    $('#nav-button').on('click', function(){
        if($('#nav-button + ul').hasClass('show')){
            $('#nav-button + ul').removeClass('show');
        }
        else{
            $('#nav-button + ul').addClass('show');
        }
    });

    if(location.pathname === "/community"){
        $('.navbar-page ul>li:nth-child(2)>a').addClass('active');
    }
    else if(location.pathname === "/course"){
        $('.navbar-page ul>li:nth-child(3)>a').addClass('active');
    }

});

function youtubeOnClick(){
    $('#youtube-div').addClass('show');
    $('#youtube-div').append('<i class="fa fa-times" style="color: white !important;"></i>');
    setTimeout(function(){
            $('#youtube-div').append('<div class="nav-table" style="width:100%; height: 100%;"><div class="nav-table-cell"><iframe src="https://www.youtube.com/embed/w4xjxO2crp4" frameborder="0" allowfullscreen></iframe></div></div>');
        }
        , 1000);
    $('#youtube-div').on('click', function(){
        $('#youtube-div').html('');
        $('#youtube-div').removeClass('show');
        $('#youtube-div').off('click');
    })
}