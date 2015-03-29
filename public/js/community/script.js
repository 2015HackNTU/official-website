$(document).ready(function () {
	$('.frame-outer').click(function () {
		$(this).addClass('animated flipOutY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$(this).removeClass('animated flipOutY').hide();
			$(this).siblings('.frame-inner').addClass('animated flipInY').show();
		});
	});
	$('.frame-inner').click(function () {
		$(this).addClass('animated flipOutY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$(this).removeClass('animated flipOutY').hide();
			$(this).siblings('.frame-outer').addClass('animated flipInY').show();
		});
	});
	$('.timeline-tag').click(function () {
		tag = $(this).attr('tag');
		$('.activity#' + tag).show().animate({
			bottom: '-20px'
		}, 1000);
	});
	$('.cross').click(function () {
		tag = $(this).attr('tag');
		$('.activity#' + tag).animate({
			bottom: '-700px'
		}, 1000, function () {
			$(this).hide();
		});
	});
});
