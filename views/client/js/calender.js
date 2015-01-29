var month_loaded;

function createClender() {
	month_loaded = [false, false, false, false, false, false, false, false, false, false, false, false];
	var monthNames = ["January", "February", "May", "June", "March", "April", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["SUN", "MON", "TUE", "WED", "TTUR", "FRI", "SAT"];

	var today = new Date();
	$('noti-calender').append('<table class="cnt" width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr class="header"></tr><tbody></table>');
}
