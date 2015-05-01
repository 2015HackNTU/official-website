var app = angular.module('communityApp', []);

app.controller('communityCtrl', ['$scope', function ($scope) {
	$scope.frameLeft = '藉由提供學生族群基本技術的課程，試圖讓更多人能結合所學解決真實的問題。';
	$scope.frameRight = 'HackNTU致力於讓每個人都擁有"Make Changes Happen"、"Get Hands Dirty"的精神，除了啟發更多火苗，我們亦希望能讓具有能力的開發者能更緊密的聚集，共創一個能激發創意及點子的平台。';
}]);

$(document).ready(function () {
	$('.a-more').click(function(){
		$('html,body').animate({
			scrollTop: $('#more').offset().top
		}, 1000);
	});
	$('.frame').height(function () {
		return $(this).width();
	});
	$(window).resize(function () {
		$('.frame').height(function () {
			return $(this).width();
		});
	});
	$('.month-tag div div').height(function () {
		return $('.timeline').height();
	});

	$('.frame-outer').click(function () {
		$(this).addClass('animated flipOutY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$(this).removeClass('animated flipOutY').hide();
			$(this).siblings('.frame-inner').css('display', 'table').addClass('animated flipInY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
				$(this).removeClass('animated flipInY');
			});
		});
	});
	$('.frame-inner').click(function () {
		$(this).addClass('animated flipOutY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$(this).removeClass('animated flipOutY').hide();
			$(this).siblings('.frame-outer').addClass('animated flipInY').show().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
				$(this).removeClass('animated flipInY');
			});
		});
	});
	$('.timeline-tag').click(function () {
		tag = $(this).attr('tag');
		$('.activity#' + tag).show().animate({
			bottom: '-55px'
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
