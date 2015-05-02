var app = angular.module('communityApp', []);

app.controller('communityCtrl', ['$scope', function ($scope) {
	$scope.frameLeft = '藉由提供學生族群基本技術的課程，試圖讓更多人能結合所學解決真實的問題。';
	$scope.frameRight = 'HackNTU致力於讓每個人都擁有"Make Changes Happen"、"Get Hands Dirty"的精神，除了啟發更多火苗，我們亦希望能讓具有能力的開發者能更緊密的聚集，共創一個能激發創意及點子的平台。';

	$scope.workshop = [
		//Event here
		{date:'3/7', name:'網路前端設計', title: '網路前端工作坊',
		 content: "<p>誰說沒有技術背景的人不能成為hacker？</p>\
					<p>我們相信只要有心，每個人都能成為自己動手解決問題<br>\
					的hacker。以一天密集的課程帶領不曾有過coding經驗，<br>\
					但擁有熱忱的學員踏出自己動手做的第一步。由HackNTU創辦人<br>\
					張凱迪擔任講師，借用他豐富的教學經驗與文組轉為工程師<br>\
					的特殊經歷，以過來人角度點燃初學者心中的hacker spirit。</p>\
					<p>除此之外，透過工作坊，學員結識其他同樣朝向黑客之路的人，<br>\
					於活動結束後，一同持續精進實力。</p>"},

		{date:'5/3', name:'樹莓派相機工作坊', title: 'Raspberry Pi Camera Workshop',
		 content: "<p>IoT(物聯網)是未來資訊技術在運算與溝通上的演進<br>\
		 			趨勢，而這樣的演進過程中將會需要各式各樣領域<br>\
		 			的技術及科技創新來帶動，小從奈米科技、大至城市<br>\
		 			無線網路的佈建，其影響範圍相當廣泛。</p>\
  					<p>在本次工作坊之中，我們將會利用<br>\
 					Raspberry pi Model B，這塊麻雀雖小，卻能發揮許多功用的<br>\
 					板子，在上面寫些簡單的程式，搭配手機去控制相機，<br>\
 					實現我們的需求，同時也能對於IoT這項概念能有所體驗。</p>"}
	];

	$scope.meetup = [
		{date:'3/28', name:'半途出家' ,title: '網頁 x 社群 x 半途出家 Meetup', 
		content: "<p>一開始由 Ruby 的大大 — 高見龍，龍哥為<br>\
					我們講述他高低起伏、充滿驚奇的程式學習歷程<br>\
					；隨後也為我們帶來他對 Ruby 情有獨鍾的原因，並小露一手 Rails <br>\
					快速開發的絕技，引起了大家一陣驚呼！</p>\
					<p>中場休息後，由 HackNTU的好朋友、曾擔任第五屆 <br>\
					Hackathon Taiwan總召的 Roger <br>\
					為我們介紹他自身半路出家的故事。<br>\
					，Roger 也對他所常用的 Node.js 進行了簡單的導覽，<br>\
					並和大家分享過去擔任總召的辛酸血淚。</p>"},

		{date:'5/28', name:'Data Science Meetup', title: 'Data Science / Open Data Meetup', 
		content:'<h1>Coming soon</h1>'},
	]
 	
 	$scope.tags = [
		//Timeline tags here
		{date:'3/7,', property: 'workshop', picname:'activity-1', left: '160', background:'#BF1920'},//workshop
		{date:'3/28', property: 'meetup', picname:'activity-2', left: '230', background:'#ED8216'},//meetup
		{date:'5/3', property: 'workshop', picname:'activity-3', left: '400', background:'#BF1920'},//workshop
		{date:'5/28', property: 'meetup', picname:'activity-4', left: '480', background:'#ED8216'}//meetup
	];

	$scope.clickTag = function(tag){
		var workshopIdx=-1, meetupIdx=-1;
		var idx = $scope.tags.indexOf(tag);
		for (var i = 0; i <= idx; i++) {
			if ($scope.tags[i].property == 'workshop')
				workshopIdx++;
			else
				meetupIdx++;
		}
		if (tag.property == 'workshop') {
			$scope.act_title = $scope.workshop[workshopIdx].title;
			$scope.act_content = $scope.workshop[workshopIdx].content;
		}
		else {
			$scope.act_title = $scope.meetup[meetupIdx].title;
			$scope.act_content = $scope.meetup[meetupIdx].content;
		}
	};
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
