$(function() {
    $("#panels").hover(function() {
        $(this).addClass("hover");
    }, function() {
        $(this).removeClass("hover");
    });

    $(".dark-orange").hover(function() {
        $(this).addClass("expand");
        $(".yellow").addClass("shrink-right");
    }, function() {
        $(this).removeClass("expand");
        $(".yellow").removeClass("shrink-right");
    });

    $(".yellow").hover(function() {
        $(".dark-orange").addClass("shrink-left");
        $(this).addClass("expand");
        $(".light-orange").addClass("shrink-right");
    }, function() {
        $(".dark-orange").removeClass("shrink-left");
        $(this).removeClass("expand");
        $(".light-orange").removeClass("shrink-right");
    });

    $(".light-orange").hover(function() {
        $(".yellow").addClass("shrink-left");
        $(this).addClass("expand");
        $(".red").addClass("shrink-right");
    }, function() {
        $(".yellow").removeClass("shrink-left");
        $(this).removeClass("expand");
        $(".red").removeClass("shrink-right");
    });

    $(".red").hover(function() {
        $(".light-orange").addClass("shrink-left");
        $(this).addClass("expand");
    }, function() {
        $(".light-orange").removeClass("shrink-left");
        $(this).removeClass("expand");
    });
})