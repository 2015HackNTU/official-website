$(function() {
	$('#web').on("click", function(){
		$('#web_teacher').removeClass('hidden');
		$('#iot_teacher').addClass('hidden');
		$('#app_teacher').addClass('hidden');
		$('#uiux_teacher').addClass('hidden');

		$('#web_slide').removeClass('hidden');
		$('#iot_slide').addClass('hidden');
		$('#app_slide').addClass('hidden');
		$('#uiux_slide').addClass('hidden');
	});

	$('#iot').on("click", function(){
		$('#web_teacher').addClass('hidden');
		$('#iot_teacher').removeClass('hidden');
		$('#app_teacher').addClass('hidden');
		$('#uiux_teacher').addClass('hidden');

		$('#web_slide').addClass('hidden');
		$('#iot_slide').removeClass('hidden');
		$('#app_slide').addClass('hidden');
		$('#uiux_slide').addClass('hidden');
	});

	$('#app').on("click", function(){
		$('#web_teacher').addClass('hidden');
		$('#iot_teacher').addClass('hidden');
		$('#app_teacher').removeClass('hidden');
		$('#uiux_teacher').addClass('hidden');

		$('#web_slide').addClass('hidden');
		$('#iot_slide').addClass('hidden');
		$('#app_slide').removeClass('hidden');
		$('#uiux_slide').addClass('hidden');
	});

	$('#uiux').on("click", function(){
		$('#web_teacher').addClass('hidden');
		$('#iot_teacher').addClass('hidden');
		$('#app_teacher').addClass('hidden');
		$('#uiux_teacher').removeClass('hidden');

		$('#web_slide').addClass('hidden');
		$('#iot_slide').addClass('hidden');
		$('#app_slide').addClass('hidden');
		$('#uiux_slide').removeClass('hidden');
	});
});