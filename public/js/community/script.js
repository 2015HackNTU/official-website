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
	$('.timeline-tag-today, .timeline').mousedown(function (e) {
		e.preventDefault();
		$(window).mousemove(function (e) {
			timeline_width = $('.timeline-group').width();
			//Width of timeline
			side_width = ($(window).width() - timeline_width) / 2;
			//Width of asides of timeline
			mouse_x = e.pageX - side_width;
			//Mouse position on move
			origin_x = $('.timeline-tag-today').position().left;
			//Origin position of timeline
			current_x = mouse_x - origin_x;
			if (mouse_x > 30 && mouse_x < timeline_width - 30) {
				$('.timeline-tag-today').css('left', '+=' + current_x);
				$('.month-tag > div,.timeline-tag').css('left', function () {
					pos = $(this).position().left + current_x;
					if (pos > timeline_width - 30 || pos < 30)
						$(this).css('visibility', 'hidden');
					else
						$(this).css('visibility', 'visible');
					//Hide divs when overflow
					return pos;
				});
			}
		}).mouseup(function () {
			$(window).unbind('mousemove');
		});
	});
});
